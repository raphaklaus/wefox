import {
  isValid,
  getWeather
} from './controllers/address.js'

import {
  register,
  login,
  logout,
  isAuthenticated
} from './controllers/auth.js'

import { authValidator } from './controllers/validator.js'

export default ({ app, cache }) => {
  // public
  app.post('/auth/register', authValidator, register)
  app.post('/auth/login', authValidator, login)

  // under authentication
  app.post('/auth/logout', isAuthenticated, logout)
  app.get('/address/is_valid', isAuthenticated, cache, isValid)
  app.get('/address/weather', isAuthenticated, cache, getWeather)

  // catch-all errors middleware
  app.use((error, req, res, next) => {
    console.error(error)
    return res.status(500).json({
      message: `Something went wrong. Details: ${error.message}`
    })
  })
}
