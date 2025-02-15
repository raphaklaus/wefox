import apicache from 'apicache'
import redis from 'redis'
import crypto from 'crypto'

const onlyStatus200 = (req, res) => res.statusCode === 200

export default apicache.options({
  redisClient: redis.createClient({
    host: process.env.REDIS_HOST
  }),
  appendKey: (req, res) => crypto.createHash('sha256').update(res.user_id + JSON.stringify(req.body)).digest('hex')
}).middleware(process.env.EXPRESS_CACHE || '12 hours', onlyStatus200)
