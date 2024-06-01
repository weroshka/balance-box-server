import asyncHandler from 'express-async-handler'
import { prisma } from '../../prisma.js'

// @desc Get all typeExpense
// @route GET /api/expense/type/
// @access Public

export const getAllTypeExpense = asyncHandler(async (req, res) => {
	const typeExpenseAll = await prisma.type_expenses.findMany({
		orderBy: {
			NAME: 'asc'
		},
		where: {
			IS_ACTIVE: true
		}
	})
	if (!typeExpenseAll) {
		res.status(404)
		throw new Error('TypeExpense not found')
	}
	res.json(typeExpenseAll)
})

// @desc Get typeExpense by id
// @route GET /api/expense/type/:id/
// @access Public

export const getTypeExpense = asyncHandler(async (req, res) => {
	const id = +req.params.id
	const typeExpense = await prisma.type_expenses.findUnique({
		where: {
			ID: id
		}
	})
	if (!typeExpense) {
		res.status(404)
		throw new Error('TypeExpense not found')
	}
	res.json(typeExpense)
})

// @desc Add typeExpense
// @route POST /api/expense/type/:id/
// @access Admin

export const addTypeExpense = asyncHandler(async (req, res) => {
	const { name, description } = req.body
	const typeExpense = await prisma.type_expenses.create({
		data: {
			NAME: name,
			DESCRIPTION: description
		}
	})
	if (!typeExpense) {
		res.status(404)
		throw new Error('TypeExpense not found')
	}
	res.json(typeExpense)
})

// @desc Update typeExpense
// @route PUT /api/expense/type/:id/
// @access Admin

export const updateTypeExpense = asyncHandler(async (req, res) => {
	const { name, description } = req.body
	try {
		const typeExpense = await prisma.type_expenses.update({
			data: {
				NAME: name,
				DESCRIPTION: description
			},
			where: {
				ID: +req.params.id
			}
		})

		res.json(typeExpense)
	} catch (error) {
		res.status(404)
		throw new Error('TypeExpense not found')
	}
})

// @desc Delete typeExpense
// @route DELETE /api/expense/type/:id/
// @access Admin

export const deleteTypeExpense = asyncHandler(async (req, res) => {
	try {
		const typeExpense = await prisma.type_expenses.delete({
			where: { ID: +req.params.id }
		})

		res.json(typeExpense)
	} catch (error) {
		res.status(404)
		throw new Error('TypeExpense not found')
	}
})
