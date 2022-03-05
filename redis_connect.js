const redis = require('redis');

const redis_client = redis.createClient(
    process.env.REDIS_PORT, process.env.REDIS_HOST);

redis_client.on("connect", function () {
  console.log("Redis Connected");
});

redis_client.on("error", (err) => {
  console.log('Error in connecting to redis');
});

module.exports = redis_client;