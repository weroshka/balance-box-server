import Router from 'express'
import { auth, isAdmin } from '../middleware/auth.middleware.js'

import {
	addStaffInGroup,
	removeStaffFromGroup
} from './staff-group.controller.js'

const router = Router()

router
	.route('/')
	.post(auth, isAdmin, addStaffInGroup)
	.delete(auth, isAdmin, removeStaffFromGroup)

export default router
