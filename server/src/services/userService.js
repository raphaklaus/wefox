import UserModel from '../models/userModel.js'

const create = ({
  username,
  password
}) => {
  const document = new UserModel({
    username,
    password
  })

  return document.save()
}

const checkCredentials = async ({
  username,
  password
}) => {
  const user = await UserModel.findOne({ username })

  return {
    isAllowed: user.checkPassword(password),
    userId: user._id.toString()
  }
}

export default {
  create,
  checkCredentials
}
