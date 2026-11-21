import "server-only";
import { createClient, type RedisClientType } from "redis";

/* One connection per warm serverless instance. */
const g = globalThis as unknown as { __redis?: Promise<RedisClientType> };

export function redis(): Promise<RedisClientType> {
  // REDIS_URL: Redis Cloud integration · KV_URL: Upstash integration
  const url = process.env.REDIS_URL || process.env.KV_URL;
  if (!url) return Promise.reject(new Error("REDIS_URL is not set"));
  if (!g.__redis) {
    const client = createClient({
      url,
      // fail fast instead of hanging a request when the database is unreachable
      socket: { connectTimeout: 5000, reconnectStrategy: (n) => (n > 3 ? false : 200 * n) },
    }) as RedisClientType;
    client.on("error", () => {});
    client.on("end", () => (g.__redis = undefined));
    g.__redis = client.connect().then(() => client).catch((e) => {
      g.__redis = undefined;
      throw e;
    });
  }
  return g.__redis;
}
