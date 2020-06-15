import weatherAPI from 'openweather-apis'

export const getWeather = (lat, long) => {
  weatherAPI.setLang('en')
  weatherAPI.setUnits('metric')
  weatherAPI.setAPPID(process.env.WEATHER_API_KEY)
  weatherAPI.setCoordinate(lat, long)

  return new Promise((resolve, reject) => {
    weatherAPI.getAllWeather(function (error, result) {
      if (error) {
        console.error(error)
        return reject(error)
      }

      const [head] = result.weather
      return resolve(head)
    })
  })
}

export const isPrecipitating = (weather) => {
  const weatherId = parseInt(weather.id)

  return weatherId >= 200 && weatherId < 700
}
