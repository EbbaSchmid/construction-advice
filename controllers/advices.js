import { Advice } from '../models/advice.js'

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
    res.redirect('/')
  })
}

function create(req, res) {
  req.body.owner = req.user.profile._id
  req.body.helpful = !!req.body.helpful
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
      title: "📐 Advice Details"
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
  Advice.findById(req.params.id)
  .then(advice => {
    if (advice.owner.equals(req.user.profile._id)){
      req.body.helpful = !!req.body.helpful 
      advice.updateOne(req.body)
      .then(updatedAdvice => {
        console.log(updatedAdvice)
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

// function createRating(req, res) {
//   console.log("rating", req.body)
//   // req.body.owner = req.user.profile._id
//   Rating.create(req.body)
//   .then(rating => {
//     res.redirect('/advices')
//   })
//   .catch(err => {
//     console.log(err)
//     res.redirect('/advices')
//   })
// }

// function deleteRating(req, res) {
//   Rating.findById(req.params.id)
//   .then(rating => {
//     if (rating.owner.equals(req.user.profile._id)){
//       rating.delete()
//       .then(deletedRating => {
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
  edit,
  update,
  deleteAdvice as delete,
  rating,
}