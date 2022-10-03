import mongoose from 'mongoose'

const Schema = mongoose.Schema

const iconSchema = new Schema({
  name: String,
  avatar: String,
}, {
  timestamps: true
})

const profileSchema = new Schema({
  name: String,
  avatar: String,
  icons: [iconSchema]
}, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}
