import {
  isValid,
  getWeather
} from './controllers/address.js'

import {
  register,
  login
} from './controllers/auth.js'

export default ({ app, cache }) => {
  // public
  app.post('/auth/register', register)
  app.post('/auth/login', login)

  // under auth...
  app.get('/address/is_valid', cache, isValid)
  app.get('/address/weather', cache, getWeather)
}
