import { Advice } from '../models/advice.js'

function newAdvice(req, res) {
  res.render('advices/new', {
    title: 'Add Advice!'
  })
}

function index(req, res) {
  Advice.find({})
  .then(advices => {
    res.render('advices/index', {
      advices: advices,
      title: "Add Advice! 📐"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/advices/new')
  })
}

function create(req, res) {
  req.body.owner = req.user.profile._id
  req.body.helpful = !!req.body.helpful
  Advice.create(req.body)
  .then(advice => {
    res.redirect(`/advices`)
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
      title: "📐 Advice Details"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/advices')
  })
}

// function flipHelpful(req, res) {
//   Advice.findById(req.params.id)
//   .then(advice => {
//     advice.helpful = !advice.helpful
//     advice.save()
//     .then(() => {
//       res.redirect(`/advices/${req.params.id}`)
//     })
//   })
//   .catch(err => {
//     console.log(err)
//     res.redirect('/advices')
//   })
// }

// function edit(req, res) {
//   Advice.findById(req.params.id)
//   .then(advice => {
//     res.render('advices/edit', {
//       advice: advice,
//       title: "edit 📐"
//     })
//   })
//   .catch(err => {
//     console.log(err)
//     res.redirect('/advices')
//   })
// }

// function update(req, res) {
//   Advice.findById(req.params.id)
//   .then(advice => {
//     if (advice.owner.equals(req.user.profile._id)){
//       req.body.helpful = !!req.body.helpful
//       advice.updateOne(req.body)
//       .then(updatedAdvice => {
//         res.redirect(`/advices/${advice._id}`)
//       })
//     } else {
//       throw new Error('NOT AUTHORIZED')
//     }
//   })
//   .catch(err => {
//     console.log(err)
//     res.redirect('/advices')
//   })
// }

// function deleteAdvice(req, res) {
//   Advice.findByIdandDelete(req.params.id)
//   .then(advice => {
//     if (advice.owner.equals(req.user.profile._id)){
//       advice.delete()
//       .then(deletedAdvice => {
//         res.redirect(`/advices`)
//       })
//     } else {
//       throw new Error('NOT AUTHORIZED')
//     }
//   })
//   .catch(err => {
//     console.log(err)
//     res.redirect('/advices')
//   })
// }

export {
  index,
  create,
  show,
  // flipHelpful,
  // edit,
  // update,
  // deleteAdvice as delete,
  newAdvice as new,
}