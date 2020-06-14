import mongoose from 'mongoose'

export default async () => {
  console.log(`mongodb://${process.env.MONGO_HOST}/${process.env.DB_NAME}`)

  try {
    await mongoose.connect(`mongodb://${process.env.MONGO_HOST}/${process.env.DB_NAME}`, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    })
  } catch (error) {
    console.log(error)
  }
}
