import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as profilesCtrl from '../controllers/profiles.js'

const router = Router()

router.get('/', isLoggedIn, ratingsCtrl.index)
router.get('/:id', isLoggedIn, ratingsCtrl.show)
router.post('/:id/icons', isLoggedIn, ratingsCtrl.createRating)
router.delete('/icons/:id', isLoggedIn, ratingsCtrl.deleteRating)


export {
  router
}