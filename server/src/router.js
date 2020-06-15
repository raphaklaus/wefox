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

import { loginValidator } from './controllers/validator.js'

export default ({ app, cache }) => {
  // public
  app.post('/auth/register', register)
  app.post('/auth/login', loginValidator, login)

  // under auth...
  app.post('/auth/logout', isAuthenticated, logout)
  app.get('/address/is_valid', isAuthenticated, cache, isValid)
  app.get('/address/weather', isAuthenticated, cache, getWeather)

  // app.use((error, req, res, next) => {
  //   const errors = validationResult(req);
  //   if (!errors.isEmpty()) {
  //     return res.status(422).json({
  //       errors: errors.array()
  //     });
  //   }
  // })
}
