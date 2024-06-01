import asyncHandler from 'express-async-handler'
import { prisma } from '../../prisma.js'
import { parseDate } from '../../utils/date.util.js'

// @desc Get all timePeriod
// @route GET /api/marginal-cost/time-period/
// @access Public

export const getAllTimePeriod = asyncHandler(async (req, res) => {
	const timePeriodAll = await prisma.time_period.findMany({
		orderBy: {
			DATE_BEGIN: 'asc'
		}
	})
	if (!timePeriodAll) {
		res.status(404)
		throw new Error('TimePeriod not found')
	}
	res.json(timePeriodAll)
})

// @desc Get timePeriod by id
// @route GET /api/marginal-cost/time-period/:id/
// @access Public

export const getTimePeriod = asyncHandler(async (req, res) => {
	const id = +req.params.id
	const timePeriod = await prisma.time_period.findUnique({
		where: {
			ID: id
		}
	})
	if (!timePeriod) {
		res.status(404)
		throw new Error('TimePeriod not found')
	}
	res.json(timePeriod)
})

// @desc Add timePeriod
// @route POST /api/marginal-cost/time-period/:id/
// @access Admin

export const addTimePeriod = asyncHandler(async (req, res) => {
	const { dateBegin, dateEnd } = req.body
	try {
		const timePeriod = await prisma.time_period.create({
			data: {
				DATE_BEGIN: parseDate(dateBegin),
				DATE_END: parseDate(dateEnd)
			}
		})
		if (!timePeriod) {
			throw new Error('TimePeriod are not created')
		}
		res.json(timePeriod)
	} catch (error) {
		res.status(404)
		throw new Error(error)
	}
})

// @desc Update timePeriod
// @route PUT /api/marginal-cost/time-period/:id/
// @access Admin

export const updateTimePeriod = asyncHandler(async (req, res) => {
	const { dateBegin, dateEnd } = req.body
	try {
		const timePeriod = await prisma.time_period.update({
			data: {
				DATE_BEGIN: parseDate(dateBegin),
				DATE_END: parseDate(dateEnd)
			},
			where: {
				ID: +req.params.id
			}
		})
		if (!timePeriod) {
			throw new Error('TimePeriod are not created')
		}
		res.json(timePeriod)
	} catch (error) {
		res.status(404)
		throw new Error(error)
	}
})

// @desc Delete timePeriod
// @route DELETE /api/marginal-cost/time-period/:id/
// @access Admin

export const deleteTimePeriod = asyncHandler(async (req, res) => {
	try {
		const timePeriod = await prisma.time_period.delete({
			where: { ID: +req.params.id }
		})

		res.json(timePeriod)
	} catch (error) {
		res.status(404)
		throw new Error('TimePeriod not found')
	}
})
