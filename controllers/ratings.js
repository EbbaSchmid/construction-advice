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