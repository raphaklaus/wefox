import mongoose from 'mongoose'
import userModel from './userModel.js'
userModel()

const Schema = mongoose.Schema

const requestLogSchema = mongoose.Schema({
  lat: {
    type: Number
  },
  long: {
    type: Number
  },
  place: {
    type: String
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  }
})

requestLogSchema.index({
  lat: 1,
  long: 1,
  user: 1
}, {
  unique: true
})

export default mongoose.model('requestLog', requestLogSchema)
