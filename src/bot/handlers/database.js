const redis = require("redis");

const client = redis.createClient({
    port      : process.env.REDIS_PORT,
    host      : process.env.REDIS_IP,
    password  : process.env.REDIS_PASS
});

module.exports = client;