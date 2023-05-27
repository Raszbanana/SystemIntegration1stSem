import redis from 'redis';

const subscriber = redis.createClient();

await subscriber.connect();

await subscriber.subscribe('myChannel', (channel, message) => {
  console.log(`Received message from channel '${channel}': ${message}`);
});
