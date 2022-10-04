import { Profile } from '../models/profile.js'

function index(req, res) {
  Profile.find({})
  .then(profiles => {
    res.render("profiles/index", {
      profiles: profiles,
      title: "🚧  Profiles",
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function show(req, res) {
  Profile.findById(req.params.id)
  .populate("advices")
  // .populate("ratings")
  .then(profile => {
    const isSelf = profile._id.equals(req.user.profile._id)
    res.render('profiles/show', {
      title: `🚧 ${profile.name}'s profile`,
      isSelf,
      profile,
      getRandomIcon: () => {
        const icons = ["🚧", "🛠", "⛏", "📐", "🔧", "🔨", "🚽"]
        return icons[Math.floor(Math.random() * icons.length)]
      }
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/profiles')
  })
}


function createIcon(req, res) {
  Profile.findById(req.user.profile._id)
  .then(profile => {
    profile.icons.push(req.body)
    profile.save()
    .then(() => {
      res.redirect(`/profiles/${req.user.profile._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect(`/profiles/${req.user.profile._id}`)
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/profiles/${req.user.profile._id}`)
  })
}

function deleteIcon(req, res) {
  Profile.findById(req.user.profile._id)
  .then(profile => {
    profile.icons.remove({_id: req.params.id})
    profile.save()
    .then(() => {
      res.redirect(`/profiles/${req.user.profile._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect(`/profiles/${req.user.profile._id}`)
    })
  })
}


export {
  index,
  show,
  createIcon,
  deleteIcon,
}
