import googleMaps from '../services/googleMaps.js'
import mapsValidation from '../services/mapsValidation.js'
import weather from '../services/openWeather.js'

export const isValid = async (req, res) => {
  const mapsRespose = await googleMaps(req.body)
  return res.json({
    valid: mapsValidation(mapsRespose)
  })
}

export const getWeather = async (req, res) => {
  const { latitude, longitude } = await googleMaps(req.body)

  return res.json(await weather(latitude, longitude))
}
