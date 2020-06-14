import express from 'express'
import router from './router.js'
import bodyParser from 'body-parser'
import mongo from './mongo.js'
import cache from './cache.js'

await mongo()

const app = express()
app.use(bodyParser.json())

router({
  app,
  cache
})

app.listen(8000)
