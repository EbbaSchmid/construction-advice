import { Rating } from '../models/rating.js'

function index(req, res) {
  Rating.find({})
  .then(ratings => {
    res.render('ratings/index', {
      advices: advices,
      title: "Add Rating! 📐"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function show(req, res) {
  Rating.findById(req.params.id)
  .populate('owner')
  .then(advice => {
    res.render('ratings/show', {
      advice: advice,
      title: "📐 Rating Details"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/ratings')
  })
}

function create(req, res) {
  req.body.owner = req.user.profile._id
  Rating.create(req.body)
  .then(rating => {
    res.redirect('/ratings')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/ratings')
  })
}

export {
  index,
  create,
  show,
}