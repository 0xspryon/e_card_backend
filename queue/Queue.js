
const Queue = require('bull');

const redis = {
    port: 6379,
    host: '127.0.0.1',
    // password: 'foobared'
}

const registerQueue = queue_name => new Queue(
    queue_name,
    {
        redis
    }
)

module.exports = {
    registerQueue,
    redisConfig: redis
}