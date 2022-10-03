import mongoose from 'mongoose'

const Schema = mongoose.Schema

const adviceSchema = new Schema({
  text: String,
  owner: { type: Schema.Types.ObjectId, ref: "Profile" },
  tags: [String],
  helpful: Boolean
}, {
  timestamps: true
})

const Advice = mongoose.model('Advice', adviceSchema)

export {
  Advice
}