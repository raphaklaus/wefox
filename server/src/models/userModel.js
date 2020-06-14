import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import uniqueValidator from 'mongoose-unique-validator'

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next()
  }

  this.password = bcrypt.hashSync(this.password, 10)
  return next()
})

userSchema.methods.checkPassword = function (plaintext) {
  return bcrypt.compareSync(plaintext, this.password)
}

userSchema.plugin(uniqueValidator)

export default mongoose.model('user', userSchema)
