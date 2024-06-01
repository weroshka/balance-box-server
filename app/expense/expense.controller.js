import asyncHandler from 'express-async-handler'
import { prisma } from '../prisma.js'
import { parseDate } from '../utils/date.util.js'

// @desc Get all expense
// @route GET /api/expense/all
// @access Admin

export const getAllExpense = asyncHandler(async (req, res) => {
	const expenseAll = await prisma.expense.findMany({
		orderBy: {
			ID: 'asc'
		},
		select: {
			ID: true,
			DATA: true,
			COST: true,
			SALES_RECEIPT: true,
			staff: {
				select: {
					ID: true,
					SURNAME: true,
					NAME: true,
					FATHER_NAME: true,
					EMAIL: true
				}
			},
			type_expenses: true
		}
	})
	if (!expenseAll) {
		res.status(404)
		throw new Error('Expense array empty')
	}
	res.json(expenseAll)
})

// @desc Get current expense
// @route GET /api/expense/
// @access Admin

export const getCurrentStaffExpense = asyncHandler(async (req, res) => {
	const id = +req.staff.ID

	const expense = await prisma.expense.findMany({
		orderBy: {
			DATA: 'desc'
		},
		where: {
			staff: {
				ID: id
			},
			IS_ACTIVE: true
		},
		select: {
			ID: true,
			DATA: true,
			COST: true,
			SALES_RECEIPT: true,
			staff: {
				select: {
					ID: true,
					SURNAME: true,
					NAME: true,
					FATHER_NAME: true,
					EMAIL: true
				}
			},
			type_expenses: true
		}
	})
	if (!expense) {
		res.status(404)
		throw new Error('Expense not found')
	}
	res.json(expense)
})

// @desc Get expense by id
// @route GET /api/expense/:id/
// @access Public

export const getExpense = asyncHandler(async (req, res) => {
	const id = +req.params.id

	const expense = await prisma.expense.findUnique({
		where: {
			ID: id
		},
		select: {
			ID: true,
			DATA: true,
			COST: true,
			SALES_RECEIPT: true,
			staff: {
				select: {
					ID: true,
					SURNAME: true,
					NAME: true,
					FATHER_NAME: true,
					EMAIL: true
				}
			},
			type_expenses: true
		}
	})
	if (!expense) {
		res.status(404)
		throw new Error('Expense not found')
	}
	res.json(expense)
})

// @desc Add expense
// @route POST /api/expense/
// @access Admin

export const addExpense = asyncHandler(async (req, res) => {
	const { date, cost, staffId, typeExpenseId } = req.body
	console.log(staffId)
	try {
		const expense = await prisma.expense.create({
			data: {
				DATA: parseDate(date),
				COST: +cost,
				SALES_RECEIPT: `${process.env.URL}:${process.env.PORT}/uploads/${req.file.filename}`,
				staff: {
					connect: {
						ID: +staffId
					}
				},
				type_expenses: {
					connect: {
						ID: +typeExpenseId
					}
				}
			},
			select: {
				ID: true,
				DATA: true,
				COST: true,
				SALES_RECEIPT: true,
				staff: {
					select: {
						ID: true,
						SURNAME: true,
						NAME: true,
						FATHER_NAME: true,
						EMAIL: true
					}
				},
				type_expenses: true
			}
		})
		if (!expense) throw new Error('Expense not created')

		res.json(expense)
	} catch (error) {
		res.status(404)
		throw new Error(error)
	}
})

// @desc Update expense
// @route PUT /api/expense/:id/
// @access Admin

export const updateExpense = asyncHandler(async (req, res) => {
	const { date, cost, salesReceipt, staffId, typeExpenseId } = req.body

	try {
		const data = {
			COST: +cost
		}

		if (date) data.DATA = parseDate(date)

		if (staffId) {
			data.staff = {
				connect: {
					ID: +staffId
				}
			}
		}
		if (typeExpenseId) {
			data.type_expenses = {
				connect: {
					ID: +typeExpenseId
				}
			}
		}

		const expense = await prisma.expense.update({
			data: data,
			select: {
				ID: true,
				DATA: true,
				COST: true,
				SALES_RECEIPT: true,
				staff: {
					select: {
						ID: true,
						SURNAME: true,
						NAME: true,
						FATHER_NAME: true,
						EMAIL: true
					}
				},
				type_expenses: true
			},
			where: {
				ID: +req.params.id
			}
		})
		if (!expense) throw new Error('Expense not created')

		res.json(expense)
	} catch (error) {
		res.status(404)
		throw new Error(error)
	}
})

// @desc Delete expense
// @route DELETE /api/expense/:id/
// @access Admin

export const deleteExpense = asyncHandler(async (req, res) => {
	try {
		const expense = await prisma.expense.delete({
			where: { ID: +req.params.id },
			select: {
				ID: true,
				DATA: true,
				COST: true,
				SALES_RECEIPT: true,
				staff: {
					select: {
						ID: true,
						SURNAME: true,
						NAME: true,
						FATHER_NAME: true,
						EMAIL: true
					}
				},
				type_expenses: true
			}
		})

		res.json(expense)
	} catch (error) {
		res.status(404)
		throw new Error('Expense not deleted')
	}
})
