import mongoose from 'mongoose'

const Schema = mongoose.Schema

const adviceSchema = new Schema({
  // _id: ObjectId,
  text: String,
  owner: { type: Schema.Types.ObjectId, ref: "Profile" },
  // ratings: [ratingSchema],
  tags: [String],
  helpful: Boolean
}, {
  timestamps: true
})

const Advice = mongoose.model('Advice', adviceSchema)

export {
  Advice
}