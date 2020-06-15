import userService from '../services/userService.js'
import { get as cacheGet, set as cacheSet, unset as cacheUnset } from '../services/authCacheService.js'
import {
  tokenGenerator,
  tokenDecrypt
} from '../services/tokenService.js'

export const register = async (req, res, next) => {
  const { username, password } = req.body
  try {
    await userService.create({ username, password })
    return res.status(201).json({
      message: 'User created.'
    })
  } catch (error) {
    next(error)
  }
}

// TODO: create catch-all error middleware
export const login = async (req, res, next) => {
  const { username, password } = req.body
  try {
    const {
      isAllowed,
      userId
    } = await userService.checkCredentials({
      username,
      password
    })

    if (isAllowed) {
      const accessToken = tokenGenerator({ userId })

      await cacheSet({ userId, accessToken })
      return res.status(202).json({
        accessToken
      })
    }

    return res.status(418).json({
      message: 'Your credentials don\'t match'
    })
  } catch (error) {
    next(error)
  }
}

// TODO: create catch-all error middleware
export const logout = async (req, res, next) => {
  try {
    const { userId } = tokenDecrypt(req.get('Access-Token'))
    await cacheUnset({ userId })
    return res.status(202).json({
      message: 'You are logged out'
    })
  } catch (error) {
    next(error)
  }
}

export const isAuthenticated = async (req, res, next) => {
  const {
    userId
  } = tokenDecrypt(req.get('Access-Token'))

  if (await cacheGet({ userId })) {
    return next()
  }

  return res.status(401).json({
    message: 'You must be authenticated to access this resource'
  })
}
