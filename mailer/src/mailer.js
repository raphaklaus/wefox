import RSMQWorker from 'rsmq-worker'
import { sendMail } from './services/mailerService.js'

var worker = new RSMQWorker('mailer', {
  host: process.env.REDIS_HOST || 'redis',
  port: process.env.REDIS_PORT || '6379'
})

worker.on('message', async (msg, next, id) => {
  const { email, message } = JSON.parse(msg)

  try {
    console.info('Message received. Dispatching email...')
    await sendMail({ to: email, text: message })
  } catch (error) {
    console.error(error)
  }

  next()
})

worker.start()
