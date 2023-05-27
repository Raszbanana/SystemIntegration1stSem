import redis from 'redis';

const redisClient = redis.createClient();

redisClient.on('error', (err) => {
  console.log('Error ' + err);
});

redisClient.on('connect', () => {
  console.log('Redis is ready');
});

await redisClient.connect();

redisClient.set('my test key', 'my test value');
const value = await redisClient.get('my test key');

console.log(value);