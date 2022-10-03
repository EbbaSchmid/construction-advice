import { Router } from 'express'
import * as advicesCtrl from '../controllers/advices.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

// GET localhost:3000/advices
router.get('/', advicesCtrl.index)

// GET localhost:3000/advices/:id
router.get('/:id', advicesCtrl.show)

// GET localhost:3000/advices/:id/edit
router.get('/:id/edit', isLoggedIn, advicesCtrl.edit)

// POST localhost:3000/advices
router.post('/', isLoggedIn, advicesCtrl.create)

// // PATCH localhost:3000/advices/:id/flip-helpful
// router.patch('/:id/flip-helpful', isLoggedIn, advicesCtrl.flipHelpful)

// // PUT localhost:3000/advices/:id
// router.put('/:id', isLoggedIn, advicesCtrl.update)

// // DELETE localhost:3000/advices/:id
// router.delete('/:id', isLoggedIn, advicesCtrl.delete)

export {
  router
}