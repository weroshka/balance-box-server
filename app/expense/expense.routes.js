import Router from 'express'
import { auth, isAdmin } from '../middleware/auth.middleware.js'
import {
	addExpense,
	deleteExpense,
	getAllExpense,
	getCurrentStaffExpense,
	getExpense,
	updateExpense
} from './expense.controller.js'
import typeExpenseRouter from './type-expense/type-expense.routes.js'

const router = Router()

router.use('/type', typeExpenseRouter)

router.route('/').post(auth, addExpense).get(auth, getCurrentStaffExpense)

router.route('/all').get(auth, isAdmin, getAllExpense)

router
	.route('/:id/')
	.get(auth, getExpense)
	.put(auth, isAdmin, updateExpense)
	.delete(auth, isAdmin, deleteExpense)

export default router
