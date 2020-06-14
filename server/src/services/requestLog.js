import RequestLog from '../models/requestLogsModel.js'

const create = () => {
  const document = new RequestLog({
    lat: 1,
    long: 1,
    requesterEmail: 'wow@wow.com'
  })

  return document.save()
}

export default {
  create
}
