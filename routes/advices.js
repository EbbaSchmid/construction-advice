import { Router } from 'express'
import * as advicesCtrl from '../controllers/advices.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

// GET localhost:3000/tacos
router.get('/', advicesCtrl.index)

// GET localhost:3000/tacos/:id
router.get('/:id', advicesCtrl.show)

// GET localhost:3000/tacos/:id/edit
router.get('/:id/edit', isLoggedIn, advicesCtrl.edit)

// POST localhost:3000/tacos
router.post('/', isLoggedIn, advicesCtrl.create)

// PUT localhost:3000/tacos/:id
router.put('/:id', isLoggedIn, advicesCtrl.update)

// DELETE localhost:3000/tacos/:id
router.delete('/:id', isLoggedIn, advicesCtrl.delete)

export {
  router
}