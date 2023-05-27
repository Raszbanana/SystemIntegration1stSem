import redis from 'redis';

const redisClient = redis.createClient();

redisClient.on('error', (err) => {
  console.log('Error ' + err);
});

redisClient.on('connect', () => {
  console.log('Redis is ready');
});

await redisClient.connect();

redisClient.setEx('key', 10, 'value');

setInterval(async () => {
  const value = await redisClient.get('key');
  console.log(await redisClient.ttl('key'));
  if (value === null) {
    redisClient.setEx('key', 10, 'value');
  }
}, 1000);
