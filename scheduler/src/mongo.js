import mongoose from 'mongoose'

export default async () => {
  try {
    await mongoose.connect(`mongodb://${process.env.MONGO_HOST || 'mongo'}/${process.env.DB_NAME || 'wefox'}`, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    })
  } catch (error) {
    console.error(error)
  }
}
