import crypto from 'crypto'

const algorithm = 'aes256'
const key = Buffer.from(process.env.AUTH_KEY)

export const tokenGenerator = ({ userId }) => {
  const salt = crypto.randomBytes(16)
  const content = JSON.stringify({ userId })
  // console.log('content!!')
  // console.log(content)

  const cipher = crypto.createCipheriv(algorithm, key, salt)

  return `${salt.toString('hex')}:${cipher.update(content, 'utf8', 'hex') + cipher.final('hex')}`
}

export const tokenDecrypt = (accessToken) => {
  try {
    const [
      salt,
      encryptedData
    ] = accessToken.split(':')

    const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(salt, 'hex'))

    return JSON.parse(decipher.update(encryptedData, 'hex', 'utf8') + decipher.final('utf-8'))
  } catch (error) {
    return { userId: undefined }
  }
}
