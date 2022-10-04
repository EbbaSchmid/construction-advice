import { Rating } from '../models/rating.js'

function index(req, res) {
  Rating.find({})
  .then(ratings => {
    res.render('ratings/index', {
      ratings: ratings,
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
  .then(rating => {
    res.render('ratings/show', {
      rating: rating,
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

function edit(req, res) {
  Advice.findById(req.params.id)
  .then(advice => {
    res.render('advices/edit', {
      advice: advice,
      title: "Edit Advice 📐"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function update(req, res) {
  console.log("REQ.BODY", req.body)
  Rating.findById(req.params.id)
  .then(rating => {
    if (rating.owner.equals(req.user.profile._id)){ 
      rating.updateOne(req.body)
      .then(updatedRating => {
        console.log(updatedRating)
        res.redirect(`/ratings`)
      })
    } else {
      throw new Error('NOT AUTHORIZED')
    }
    
  })
  .catch(err => {
    console.log(err)
    res.redirect('/ratings')
  })
}

function deleteRating(req, res) {
  Rating.findById(req.params.id)
  .then(rating => {
    if (rating.owner.equals(req.user.profile._id)){
      rating.delete()
      .then(deletedRating => {
        res.redirect(`/ratings`)
      })
    } else {
      throw new Error('NOT AUTHORIZED')
    }
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
  edit,
  update,
  deleteRating as delete,
}