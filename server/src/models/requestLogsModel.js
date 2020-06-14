import mongoose from 'mongoose'

const Schema = mongoose.Schema

export const RequestLog = new Schema({
  lat: Schema.Types.Number,
  long: Schema.Types.Number,
  requesterEmail: Schema.Types.String
})
