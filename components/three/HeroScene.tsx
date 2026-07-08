"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const NODE_COUNT = 130;
const RADIUS = 5;
const LINK_DISTANCE = 2.1;
const PULSE_COUNT = 9;

/** Nodes spread on a fibonacci sphere with radial jitter — a loose cluster topology. */
function buildNodes(): Float32Array {
  const positions = new Float32Array(NODE_COUNT * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < NODE_COUNT; i++) {
    const y = 1 - (i / (NODE_COUNT - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    const jitter = RADIUS * (0.75 + Math.random() * 0.35);
    positions[i * 3] = Math.cos(theta) * r * jitter;
    positions[i * 3 + 1] = y * jitter * 0.85;
    positions[i * 3 + 2] = Math.sin(theta) * r * jitter;
  }
  return positions;
}

function buildEdges(nodes: Float32Array): [THREE.Vector3, THREE.Vector3][] {
  const edges: [THREE.Vector3, THREE.Vector3][] = [];
  const a = new THREE.Vector3();
  const b = new THREE.Vector3();
  for (let i = 0; i < NODE_COUNT; i++) {
    a.fromArray(nodes, i * 3);
    for (let j = i + 1; j < NODE_COUNT; j++) {
      b.fromArray(nodes, j * 3);
      if (a.distanceTo(b) < LINK_DISTANCE) {
        edges.push([a.clone(), b.clone()]);
      }
    }
  }
  return edges;
}

function Pulses({
  edges,
  animate,
}: {
  edges: [THREE.Vector3, THREE.Vector3][];
  animate: boolean;
}) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const state = useMemo(
    () =>
      Array.from({ length: PULSE_COUNT }, () => ({
        edge: Math.floor(Math.random() * edges.length),
        t: Math.random(),
        speed: 0.25 + Math.random() * 0.5,
      })),
    [edges]
  );
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((_, delta) => {
    if (!mesh.current) return;
    state.forEach((p, i) => {
      if (animate) {
        p.t += delta * p.speed;
        if (p.t > 1) {
          p.t = 0;
          p.edge = Math.floor(Math.random() * edges.length);
        }
      }
      const [from, to] = edges[p.edge];
      dummy.position.lerpVectors(from, to, p.t);
      // shrink at the ends so pulses fade in and out of nodes
      const s = 0.5 + Math.sin(p.t * Math.PI) * 0.9;
      dummy.scale.setScalar(s);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, PULSE_COUNT]}>
      <sphereGeometry args={[0.038, 8, 8]} />
      <meshBasicMaterial
        color="#baffdd"
        transparent
        opacity={0.85}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </instancedMesh>
  );
}

function Network({ animate }: { animate: boolean }) {
  const group = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });

  const nodes = useMemo(buildNodes, []);
  const edges = useMemo(() => buildEdges(nodes), [nodes]);
  const linePositions = useMemo(() => {
    const arr = new Float32Array(edges.length * 6);
    edges.forEach(([a, b], i) => {
      a.toArray(arr, i * 6);
      b.toArray(arr, i * 6 + 3);
    });
    return arr;
  }, [edges]);

  // Canvas has pointer-events disabled so it never blocks the hero UI;
  // track the mouse on window instead for parallax.
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((_, delta) => {
    if (!group.current || !animate) return;
    group.current.rotation.y += delta * 0.06;
    const targetX = pointer.current.y * 0.18;
    const targetZ = pointer.current.x * 0.1;
    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      targetX,
      2,
      delta
    );
    group.current.rotation.z = THREE.MathUtils.damp(
      group.current.rotation.z,
      targetZ,
      2,
      delta
    );
  });

  return (
    <group ref={group} rotation={[0.1, 0, 0]}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[nodes, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#00ff88"
          size={0.09}
          sizeAttenuation
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#00ff88"
          transparent
          opacity={0.13}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
      <Pulses edges={edges} animate={animate} />
    </group>
  );
}

export default function HeroScene() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <Canvas
      aria-hidden
      camera={{ position: [0, 0, 10.5], fov: 45 }}
      dpr={[1, 1.75]}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      frameloop={reducedMotion ? "demand" : "always"}
      className="pointer-events-none"
      style={{ pointerEvents: "none" }}
    >
      <Network animate={!reducedMotion} />
    </Canvas>
  );
}
