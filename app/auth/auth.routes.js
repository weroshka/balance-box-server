import Router from 'express'
import { authStaff, registerStaff } from './auth.controller.js'

const router = Router()

router.route('/login/').post(authStaff)
router.route('/register/').post(registerStaff)

export default router
