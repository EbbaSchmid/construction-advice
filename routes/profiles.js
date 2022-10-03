import { Router } from 'express'
import { isLoggedIn } from '../middleware/middleware.js'
import * as profilesCtrl from '../controllers/profiles.js'

const router = Router()

router.get('/', isLoggedIn, profilesCtrl.index)
router.get('/:id', isLoggedIn, profilesCtrl.show)
router.post('/:id/icons', isLoggedIn, profilesCtrl.createIcon)
router.delete('/icons/:id', isLoggedIn, profilesCtrl.deleteIcon)


export {
  router
}