import { Router } from 'express'
import passport from 'passport'
import * as advicesCtrl from '../controllers/advices.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

// GET localhost:3000/advices
router.get('/', isLoggedIn, advicesCtrl.index)

// GET localhost:3000/advices/:id
router.get('/:id', advicesCtrl.show)

// GET localhost:3000/advices/:id/edit
router.get('/:id/edit', isLoggedIn, advicesCtrl.edit)

// POST localhost:3000/advices
router.post('/', isLoggedIn, advicesCtrl.create)

// PUT localhost:3000/advices/:id
router.put('/:id', isLoggedIn, advicesCtrl.update)

// DELETE localhost:3000/advices/:id
router.delete('/:id', isLoggedIn, advicesCtrl.delete)

router.post('/:id/advices', isLoggedIn, advicesCtrl.createRating)
router.delete('/advices/:id', isLoggedIn, advicesCtrl.updateRating)

// // PATCH localhost:3000/advices/:id/rating
router.patch('/:id/rating', isLoggedIn, advicesCtrl.rating)

export {
  router
}