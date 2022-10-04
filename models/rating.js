import mongoose from 'mongoose'

const Schema = mongoose.Schema

const ratingSchema = new mongoose.Schema({
  score: Number,
  owner: { type: Schema.Types.ObjectId, ref: "Profile" },
}, {
  timestamps: true
})


const Rating = mongoose.model('Rating', ratingSchema)

export {
  Rating
}