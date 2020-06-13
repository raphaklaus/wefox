export default (mapsRes) => {
  return (
    mapsRes !== undefined &&
    hasLatLog(mapsRes) &&
    hasGreatConfidence(mapsRes)
  )
}

const hasLatLog = (mapsRes) => {
  return ['latitude', 'longitude'].every(property => {
    return Object.keys(mapsRes).includes(property)
  })
}

const hasGreatConfidence = (mapsRes) => {
  return mapsRes.extra?.confidence > 0.8
}
