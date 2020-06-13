import cron from 'node-cron'
import RSMQPromise from 'rsmq-promise'

const rsmq = new RSMQPromise({
  host: "127.0.0.1",
  port: 6379
});

cron.schedule('* * * * * *', async () => {
  await rsmq.sendMessage({
    qname: 'myqueue',
    message: 'my message from scheduler!'
  })
});
