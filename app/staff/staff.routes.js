import Router from 'express'
import { auth, isAdmin } from '../middleware/auth.middleware.js'

import {
	addStaff,
	deleteStaff,
	getAllStaff,
	getCurrentStaff,
	getStaff,
	updateStaff
} from './staff.controller.js'

import groupRouter from './group/group.routes.js'

const router = Router()

router.use('/group', groupRouter)

router.route('/').post(auth, isAdmin, addStaff).get(auth, getCurrentStaff)

router.route('/all').get(auth, isAdmin, getAllStaff)

router
	.route('/:id')
	.get(auth, getStaff)
	.put(auth, isAdmin, updateStaff)
	.delete(auth, isAdmin, deleteStaff)

export default router
