import googleMaps from '../services/googleMaps.js'
import mapsValidation from '../services/mapsValidation.js'
import weather from '../services/openWeather.js'
import requestLogService from '../services/requestLog.js'
import {
  tokenDecrypt
} from '../services/tokenService.js'

export const isValid = async (req, res, next) => {
  try {
    const mapsResponse = await googleMaps(req.body)
    const {
      userId
    } = tokenDecrypt(req.get('Access-Token'))

    await requestLogService.create({
      lat: mapsResponse.latitude,
      long: mapsResponse.longitude,
      userId
    })

    return res.json({
      valid: mapsValidation(mapsResponse)
    })
  } catch (error) {
    next(error)
  }
}

export const getWeather = async (req, res, next) => {
  try {
    const { latitude, longitude } = await googleMaps(req.body)
    return res.json(await weather(latitude, longitude))
  } catch (error) {
    next(error)
  }
}
