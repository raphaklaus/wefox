import Agenda from 'agenda'
import RSMQPromise from 'rsmq-promise'
import requestLogService from './services/requestLogService.js'
import { getWeather, isPrecipitating } from './services/openWeather.js'
import mongo from './mongo.js'

const rsmq = new RSMQPromise({
  host: process.env.REDIS_HOST || 'redis',
  port: parseInt(process.env.REDIS_PORT || '6379')
})

const agenda = new Agenda({
  db: {
    address: `mongodb://${process.env.MONGO_HOST || 'mongo'}/agenda`,
    options: {
      useUnifiedTopology: true
    }
  }
})

agenda.define('check previous addresses queried', async job => {
  try {
    const requestLogs = await requestLogService.getAll()

    // TODO: change that to a Stream and work with back-pressure abilities
    requestLogs.forEach(async requestLog => {
      const weather = await getWeather(requestLog.lat, requestLog.long)

      if (isPrecipitating(weather)) {
        const payload = {
          email: requestLog.user.email,
          message: 'You queried this place before, so we think would be nice for ' +
          `you to know that ${requestLog.place} is now having ${weather.description}`
        }

        await rsmq.sendMessage({
          qname: 'mailer',
          message: JSON.stringify(payload)
        })
      }
    })
  } catch (error) {
    console.error(error)
  }
})

mongo()
  .then(() => agenda.start)
  .then(() => agenda.every(process.env.SCHEDULE, 'check previous addresses queried'))
