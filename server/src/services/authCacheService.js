import { promisify } from 'util'
import redis from 'redis'

const client = redis.createClient()
const getAsync = promisify(client.get).bind(client)
const setAsync = promisify(client.set).bind(client)

export const set = async ({ userId, accessToken }) => {
  await setAsync(`auth_${userId}`, accessToken)
}

export const get = async ({ userId }) => {
  await getAsync(`auth_${userId}`)
}
