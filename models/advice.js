import mongoose from 'mongoose'

const Schema = mongoose.Schema

const ratingSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: "Profile" },
  rate: Number,
}, {
  timestamps: true
})


const adviceSchema = new Schema({
  text: String,
  owner: { type: Schema.Types.ObjectId, ref: "Profile" },
  tags: [String],
  ratings: [ratingSchema],
}, {
  timestamps: true
})


const Advice = mongoose.model('Advice', adviceSchema)

export {
  Advice
}