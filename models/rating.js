const ratingSchema = new mongoose.Schema({
  score: Number,
  owner: { type: Schema.Types.ObjectId, ref: "Profile" },
})

export {
  Rating
}