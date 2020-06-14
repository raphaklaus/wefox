import mongoose from 'mongoose'

const Schema = mongoose.Schema

const requestLogSchema = mongoose.Schema({
  lat: Schema.Types.Number,
  long: Schema.Types.Number,
  requesterEmail: Schema.Types.String
})

export default mongoose.model('requestLog', requestLogSchema)
