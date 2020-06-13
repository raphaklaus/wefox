import {
  isValid,
  getWeather
} from './controllers/address.js'

export default (app) => {
  app.get('/address/is_valid', isValid)
  app.get('/address/weather', getWeather)
}
