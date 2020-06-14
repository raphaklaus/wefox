import {
  isValid,
  getWeather
} from './controllers/address.js'

export default ({ app, cache }) => {
  app.get('/address/is_valid', cache, isValid)
  app.get('/address/weather', cache, getWeather)
}
