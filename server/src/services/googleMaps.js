import nodeGeocoder from 'node-geocoder'

const geocoder = nodeGeocoder({
  provider: 'google',
  apiKey: process.env.MAPS_API_KEY
})

export default async ({
  street,
  streetNumber,
  town,
  country,
  postalCode
}) => {
  const [res] = await geocoder.geocode({
    address: `${street} ${streetNumber} ${town}`,
    country: country,
    zipcode: postalCode,
    limit: 1
  })

  return res
}
