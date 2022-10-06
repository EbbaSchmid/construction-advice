import { Advice } from '../models/advice.js'

function index(req, res) {
  Advice.find({}).lean()
  .then(advices => {
    const advice = advices.map(a => {
      const total = a.ratings.reduce((t, r) => t + parseInt(r.rate), 0) 
      return {
        ...a, 
        avg: total / a.ratings.length
      }
    })
    console.log(advice)
    res.render('advices/index', {
      advices: advice,
      title: "Add Advice! 📐"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function create(req, res) {
  req.body.owner = req.user.profile._id
    Advice.create(req.body)
      .then(advice => {
        res.redirect('/advices')
  })
  .catch(err => {
    console.log(err)
      res.redirect('/advices')
  })
}

function show(req, res) {
  Advice.findById(req.params.id)
    .populate('owner')
      .then(advice => {
      res.render('advices/show', {
        advice: advice,
        title: " Advice Details 📐"
      })
    })
  .catch(err => {
    console.log(err)
    res.redirect('/advices')
  })
}

function edit(req, res) {
  Advice.findById(req.params.id)
  .then(advice => {
    res.render('advices/edit', {
      advice: advice,
      title: " Edit Advice 📐"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function update(req, res) {
  console.log("REQ.BODY", req.body)
    Advice.findById(req.params.id)
      .then(advice => {
    if (advice.owner.equals(req.user.profile._id)){
      advice.updateOne(req.body)
        .then(updatedAdvice => {
          res.redirect(`/advices`)
        })
    } else {
      throw new Error('NOT AUTHORIZED')
    }
    
    })
  .catch(err => {
    console.log(err)
    res.redirect('/advices')
  })
}

function deleteAdvice(req, res) {
  Advice.findById(req.params.id)
  .then(advice => {
    if (advice.owner.equals(req.user.profile._id)){
      advice.delete()
      .then(deletedAdvice => {
        res.redirect(`/advices`)
      })
    } else {
      throw new Error('NOT AUTHORIZED')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/advices')
  })
}

function rating(req, res) {
  rating.findById(req.params.id)
  .then(rating => {
    rating.save()
    .then(() => {
      res.redirect(`/advices/${req.params.id}`)
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/advices')
  })
}

function createRating(req, res) {
  Advice.findById(req.params.id)
    .then(advice => {
      advice.ratings.push(req.body)
      advice.save()
        .then(() => {
          res.redirect(`/advices/${req.params.id}`)
        })
    .catch(err => {
      res.redirect(`/advices/${req.params.id}`)
    })
  })
    .catch(err => {
      res.redirect(`/advices/${req.params.id}`)
  })
}

function updateRating(req, res) {
  Advice.findById(req.params.id)
    .then(rating => {
      if (advice.owner.equals(req.user.profile._id)){
        rating.updateOne(req.body)
        .then(updatedRating => {
          res.redirect(`/advices`)
        })
      } else {
        throw new Error('NOT AUTHORIZED')
      }
  })
  .catch(err => {
    res.redirect('/advices')
  })
}

export {
  index,
  create,
  show,
  edit,
  update,
  deleteAdvice as delete,
  rating,
  createRating,
  updateRating,
}