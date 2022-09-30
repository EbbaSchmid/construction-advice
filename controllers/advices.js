import { Advice } from '../models/advice.js'

function index(req, res) {
  Advice.find({})
  .then(advices => {
    res.render('advices/index', {
      advices,
      title: "📐"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function create(req, res) {
  req.body.owner = req.user.profile._id
  console.log(req.body)
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
    console.log(taco);
    res.render('advices/show', {
      advice,
      title: "📐 show"
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
      advice,
      title: "edit 📐"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/advices')
  })
}

function update(req, res) {
  Advice.findById(req.params.id)
  .then(advice => {
    if (advice.owner.equals(req.user.profile._id)){
      advice.updateOne(req.body)
      .then(updatedAdvice => {
        res.redirect(`/advices/${advice._id}`)
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

export {
  index,
  create,
  show,
  edit,
  update,
  deleteAdvice as delete,
}