import RequestLog from '../models/requestLog.js'

const getAll = async () => {
  return RequestLog.find({}).populate({
    path: 'user'
  })
}

export default {
  getAll
}
