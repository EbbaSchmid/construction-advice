import { Router } from 'express'
import passport from 'passport'
import * as ratingsCtrl from '../controllers/ratings.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

// GET localhost:3000/ratings
router.get('/', isLoggedIn, ratingsCtrl.index)

// GET localhost:3000/ratings/:id
router.get('/:id', ratingsCtrl.show)

// GET localhost:3000/ratings/:id/edit
router.get('/:id/edit', isLoggedIn, ratingsCtrl.edit)

// POST localhost:3000/ratings
router.post('/', isLoggedIn, ratingsCtrl.create)

// PUT localhost:3000/ratings/:id
router.put('/:id', isLoggedIn, ratingsCtrl.update)

// DELETE localhost:3000/ratings/:id
router.delete('/:id', isLoggedIn, ratingsCtrl.delete)

export {
  router
}