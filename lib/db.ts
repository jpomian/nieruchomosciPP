// lib/db.ts
import { createClient } from 'redis';

let client: ReturnType<typeof createClient>;

export async function getRedisClient() {
  if (!client) {
    client = createClient({
      password: process.env.REDIS_PW,
      socket: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT || '6379'),
        family: 4
      }
    });

    client.on('error', (err: Error) => console.error('Redis Client Error', err));
    await client.connect();
  }
  return client;
}