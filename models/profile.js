import mongoose from 'mongoose'

const Schema = mongoose.Schema

const iconSchema = new Schema({
  name: String,
  avatar: String,
  trade: String,
  years: Number,
  location: String,
  local: Number,
}, {
  timestamps: true
})

const profileSchema = new Schema({
  name: String,
  avatar: String,
  icons: [iconSchema],
  advices: [{ type: Schema.Types.ObjectId, ref: 'Advice' }],
  ratings: [{ type: Schema.Types.ObjectId, ref: 'Rating' }],
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}
