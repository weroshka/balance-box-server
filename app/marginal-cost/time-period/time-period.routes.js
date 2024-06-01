import Router from 'express'
import { auth, isAdmin } from '../../middleware/auth.middleware.js'
import {
	addTimePeriod,
	deleteTimePeriod,
	getAllTimePeriod,
	getTimePeriod,
	updateTimePeriod
} from './time-period.controller.js'

const router = Router()

router.route('/').post(auth, isAdmin, addTimePeriod).get(getAllTimePeriod)

router
	.route('/:id/')
	.get(getTimePeriod)
	.put(auth, isAdmin, updateTimePeriod)
	.delete(auth, isAdmin, deleteTimePeriod)

export default router
