import Redis from 'ioredis';


function createClient() {
  const client = new Redis("redis://:examplepassword@localhost:6379");

  client.on('error', (err) => {
    console.error('[redis] error', err?.message || err);
  });

  client.on('connect', () => {
    console.info('[redis] connecting');
  });

  client.on('ready', () => {
    console.info('[redis] ready');
  });

  return client;
}

declare global {
  var __migi_redis__: ReturnType<typeof createClient> | undefined;
}

export const redis = globalThis.__migi_redis__ ?? (globalThis.__migi_redis__ = createClient());

export default redis;
