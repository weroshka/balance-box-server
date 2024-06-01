import Router from 'express'
import timePeriodRouter from '../marginal-cost/time-period/time-period.routes.js'
import { auth, isAdmin } from '../middleware/auth.middleware.js'
import {
	addMarginalCost,
	deleteMarginalCost,
	getAllMarginalCost,
	getMarginalCost,
	updateMarginalCost
} from './marginal-cost.controller.js'

const router = Router()

router.use('/time-period', timePeriodRouter)

router.route('/').post(auth, isAdmin, addMarginalCost).get(getAllMarginalCost)

router
	.route('/:id/')
	.get(getMarginalCost)
	.put(auth, isAdmin, updateMarginalCost)
	.delete(auth, isAdmin, deleteMarginalCost)

export default router
