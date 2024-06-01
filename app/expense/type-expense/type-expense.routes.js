import Router from 'express'
import { auth, isAdmin } from '../../middleware/auth.middleware.js'
import {
	addTypeExpense,
	deleteTypeExpense,
	getAllTypeExpense,
	getTypeExpense,
	updateTypeExpense
} from './type-expense.controller.js'

const router = Router()

router.route('/').post(auth, isAdmin, addTypeExpense).get(getAllTypeExpense)

router
	.route('/:id/')
	.get(getTypeExpense)
	.put(auth, isAdmin, updateTypeExpense)
	.delete(auth, isAdmin, deleteTypeExpense)

export default router
