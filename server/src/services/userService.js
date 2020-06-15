import UserModel from '../models/userModel.js'

const create = ({
  email,
  password
}) => {
  const document = new UserModel({
    email,
    password
  })

  return document.save()
}

const checkCredentials = async ({
  email,
  password
}) => {
  const user = await UserModel.findOne({ email })

  return {
    isAllowed: user.checkPassword(password),
    userId: user._id.toString()
  }
}

export default {
  create,
  checkCredentials
}
