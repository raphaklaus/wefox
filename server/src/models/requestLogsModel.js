import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const Schema = mongoose.Schema

const requestLogSchema = mongoose.Schema({
  lat: {
    type: Number,
    required: true
  },
  long: {
    type: Number,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
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

requestLogSchema.plugin(uniqueValidator)

export default mongoose.model('requestLog', requestLogSchema)
