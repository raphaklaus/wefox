import RequestLog from '../models/requestLogsModel.js'

const create = ({ lat, long, place, userId }) => {
  const document = new RequestLog({
    lat,
    long,
    place,
    user: userId
  })

  return document.save()
}

export default {
  create
}
