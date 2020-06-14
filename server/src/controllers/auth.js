import userService from '../services/userService.js'
import { set as cacheSet, unset as cacheUnset } from '../services/authCacheService.js'
import {
  tokenGenerator,
  tokenDecrypt
} from '../services/tokenService.js'

// TODO: Validations (request body keys existance, etc...)
export const register = async (req, res) => {
  const { username, password } = req.body
  try {
    await userService.create({ username, password })
    return res.status(201).json({
      message: 'User created.'
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      error: `Something went wrong. Error: ${error.message}`
    })
  }
}

// TODO: create catch-all error middleware
export const login = async (req, res) => {
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
      const accessToken = tokenGenerator()

      await cacheSet({ userId, accessToken })
      return res.status(202).json({
        accessToken
      })
    }

    // review status code
    return res.status(401).json({
      message: 'Your credentials don\'t match'
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      error: `Something went wrong. Error: ${error.message}`
    })
  }
}

// TODO: create catch-all error middleware
export const logout = async (req, res) => {
  try {
    const {userId} = tokenDecrypt(req.get('Access-Token'))
    await cacheUnset({userId})
    return res.status(202).json({
      message: 'You are logged out'
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      error: `Something went wrong. Error: ${error.message}`
    })
  }
}
