import userService from '../services/userService.js'
import { set as cacheSet } from '../services/authCacheService.js'
import {
  tokenGenerator
} from '../services/tokenService.js'

// TODO: Validations (request body keys existance, etc...)
export const register = async (req, res) => {
  const { username, password } = req.body
  try {
    await userService.create({ username, password })
    res.status(201).json({
      message: 'User created.'
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
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
      res.status(202).json({
        accessToken
      })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({
      error: `Something went wrong. Error: ${error.message}`
    })
  }
}

// TODO: create catch-all error middleware
export const logout = async (req, res) => {
  try {
    // TODO: find user
    // remove key
  } catch (error) {
    console.error(error)
    res.status(500).json({
      error: `Something went wrong. Error: ${error.message}`
    })
  }
}
