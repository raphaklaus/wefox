import weatherAPI from 'openweather-apis'

weatherAPI.setLang('en')
weatherAPI.setUnits('metric')
weatherAPI.setAPPID(process.env.WEATHER_API_KEY)

export default async (lat, long) => {
  weatherAPI.setCoordinate(lat, long)
  const { weather, main } = await getWeather()

  return formatResponse(weather, main)
}

const formatResponse = (weather, main) => {
  const [weatherHead] = weather

  return {
    description: weatherHead.description,
    temperature: main.temp
  }
}

const getWeather = () => {
  return new Promise((resolve, reject) => {
    weatherAPI.getAllWeather(function (error, result) {
      if (error) {
        return reject(error)
      }

      return resolve(result)
    })
  })
}
