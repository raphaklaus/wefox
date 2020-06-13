import googleMaps from '../services/googleMaps.js'

export const isValid = async (req, res) => {
  // const _mapsRes = await googleMaps(req.body)
  return res.json(await googleMaps(req.body))
}

export const getWeather = (req, res) => {
  res.send('weather seems kinda strange...')
}
