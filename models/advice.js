import mongoose from 'mongoose'

const Schema = mongoose.Schema

const adviceSchema = new Schema({
  _id: ObjectId,
  content: String,
  author: {ObjectId, ref: "Profile"},
  ratings: [ratingSchema],
  tags: [String]
}, {
  timestamps: true
})

const Taco = mongoose.model('Advice', adviceSchema)

export {
  Advice
}