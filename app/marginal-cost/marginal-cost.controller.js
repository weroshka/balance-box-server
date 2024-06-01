import asyncHandler from 'express-async-handler'
import { prisma } from '../prisma.js'

// @desc Get all marginalCost
// @route GET /api/marginal-cost/
// @access Public

export const getAllMarginalCost = asyncHandler(async (req, res) => {
	const marginalCostAll = await prisma.type_expenses_and_time_period.findMany({
		orderBy: {
			time_period: {
				DATE_BEGIN: 'asc'
			}
		},
		include: {
			time_period: true,
			type_expenses: true
		}
	})
	if (!marginalCostAll) {
		res.status(404)
		throw new Error('MarginalCost not found')
	}
	res.json(marginalCostAll)
})

// @desc Get marginalCost by id
// @route GET /api/marginal-cost/:id/
// @access Public

export const getMarginalCost = asyncHandler(async (req, res) => {
	const id = +req.params.id
	const marginalCost = await prisma.type_expenses_and_time_period.findUnique({
		where: {
			ID: id
		},
		include: {
			time_period: true,
			type_expenses: true
		}
	})
	if (!marginalCost) {
		res.status(404)
		throw new Error('MarginalCost not found')
	}
	res.json(marginalCost)
})

// @desc Add marginalCost
// @route POST /api/marginal-cost/:id/
// @access Admin

export const addMarginalCost = asyncHandler(async (req, res) => {
	const { cost, timePeriodId, typeExpenseId } = req.body
	const marginalCost = await prisma.type_expenses_and_time_period.create({
		data: {
			MARGINAL_COST: +cost,
			time_period: {
				connect: {
					ID: +timePeriodId
				}
			},
			type_expenses: {
				connect: {
					ID: +typeExpenseId
				}
			}
		},
		include: {
			time_period: true,
			type_expenses: true
		}
	})
	if (!marginalCost) {
		res.status(404)
		throw new Error('MarginalCost not found')
	}
	res.json(marginalCost)
})

// @desc Update marginalCost
// @route PUT /api/marginal-cost/:id/
// @access Admin

export const updateMarginalCost = asyncHandler(async (req, res) => {
	try {
		const { cost, timePeriodId, typeExpenseId } = req.body

		const data = {
			MARGINAL_COST: +cost
		}

		if (timePeriodId) {
			data.time_period = {
				connect: {
					ID: +timePeriodId
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

		const marginalCost = await prisma.type_expenses_and_time_period.update({
			data: data,
			include: {
				time_period: true,
				type_expenses: true
			},
			where: {
				ID: +req.params.id
			}
		})

		if (!marginalCost) {
			throw new Error('MarginalCost not found')
		}

		res.json(marginalCost)
	} catch (error) {
		res.status(404)
		throw new Error(error)
	}
})

// @desc Delete marginalCost
// @route DELETE /api/marginal-cost/:id/
// @access Admin

export const deleteMarginalCost = asyncHandler(async (req, res) => {
	try {
		const marginalCost = await prisma.type_expenses_and_time_period.delete({
			where: { ID: +req.params.id },
			include: {
				time_period: true,
				type_expenses: true
			}
		})

		res.json(marginalCost)
	} catch (error) {
		res.status(404)
		throw new Error('MarginalCost not found')
	}
})
