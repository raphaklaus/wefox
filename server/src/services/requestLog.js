import RequestLog from '../models/requestLogsModel.js'

const create = ({ lat, long, userId }) => {
  const document = new RequestLog({
    lat,
    long,
    user: userId
  })

  return document.save()
}

export default {
  create
}
