import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
  email: {
    type: String
  },
  password: {
    type: String
  }
})

export default mongoose.model('user', userSchema)
