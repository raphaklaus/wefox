import { promisify } from 'util'
import redis from 'redis'

const client = redis.createClient()
const getAsync = promisify(client.get).bind(client)
const setAsync = promisify(client.setex).bind(client)
const delAsync = promisify(client.del).bind(client)
const expirationTime = 60 * 60 * 10

export const set = async ({ userId, accessToken }) => {
  await setAsync(`auth_${userId}`, expirationTime, accessToken)
}

export const get = async ({ userId }) => {
  console.log(`auth_${userId}`)

  return getAsync(`auth_${userId}`)
}

export const unset = async ({ userId }) => {
  await delAsync(`auth_${userId}`)
}
