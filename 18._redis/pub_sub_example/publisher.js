import redis from 'redis';

const publisher = redis.createClient();

publisher.on('error', (err) => {
  console.log('Error ' + err);
});

publisher.on('connect', () => {
  console.log('Publisher is ready');
});

await publisher.connect();

setInterval(() => {
  publisher.publish('myChannel', 'test');
}, 1000);
