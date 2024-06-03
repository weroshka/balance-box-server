import { hash } from 'argon2'
import asyncHandler from 'express-async-handler'
import { prisma } from '../prisma.js'
// @desc Get fields table
// @route GET /api/table/:table/
// @access Admin

export const getStructureTable = asyncHandler(async (req, res) => {
	const table = req.params.table
	if (prisma[table]) res.json(prisma[table].fields)
	else res.json(false)
})

// @desc Get all data of table
// @route GET /api/table/:table/all
// @access Admin

export const getDataTable = asyncHandler(async (req, res) => {
	const table = req.params.table
	if (prisma[table]) {
		const data = await prisma[table].findMany({
			orderBy: {
				ID: 'asc'
			},
			where: {
				IS_ACTIVE: true
			}
		})
		if (data) res.json(data)
		else res.json(false)
	} else res.json(false)
})

// @desc Get element of table
// @route GET /api/table/:table/:id
// @access Admin

export const getElementTable = asyncHandler(async (req, res) => {
	const table = req.params.table
	const id = +req.params.id
	if (prisma[table]) {
		const data = await prisma[table].findFirst({
			orderBy: {
				ID: 'asc'
			},
			where: {
				ID: id
			}
		})
		if (data) res.json(data)
		else res.json(false)
	} else res.json(false)
})

// @desc Add all data of table
// @route POST /api/table/:table/add
// @access Admin

export const addDataTable = asyncHandler(async (req, res) => {
	const table = req.params.table
	const params = req.body

	if (params.PASSWORD) params.PASSWORD = await hash(params.PASSWORD)

	const dateFormatArr = ['DATA', 'DATE']
	const numberFormatArr = ['COST', 'ID']

	Object.keys(params).forEach(key => {
		dateFormatArr.map(dS => {
			if (key.includes(dS)) params[key] = new Date(params[key]).toISOString()
		})

		numberFormatArr.map(nS => {
			if (key.includes(nS)) params[key] = +params[key]
		})
	})

	if (prisma[table]) {
		try {
			const data = await prisma[table].create({
				data: params
			})
			if (!data) {
				res.status(404)
				throw new Error(
					'Введенных данных есть одна из этих ошибок - неверный формат даты (должен быть гггг-мм-дд), дублирующаяся строка или же другие технические причины. Свяжитесь с поддержкой'
				)
			}
			res.json(data)
		} catch (error) {
			res.status(404)
			throw new Error(error)
		}
	}
	res.status(404)
	throw new Error('Данной сущности нет в базе данных')
})

// @desc Update all data of table
// @route Put /api/table/:table/:id
// @access Admin

export const updateDataTable = asyncHandler(async (req, res) => {
	const table = req.params.table
	const params = req.body
	const id = +req.params.id

	if (params.PASSWORD) params.PASSWORD = await hash(params.PASSWORD)

	const dateFormatArr = ['DATA', 'DATE']
	const numberFormatArr = ['COST', 'ID']

	Object.keys(params).forEach(key => {
		dateFormatArr.map(dS => {
			if (key.includes(dS)) params[key] = new Date(params[key]).toISOString()
		})

		numberFormatArr.map(nS => {
			if (key.includes(nS)) params[key] = +params[key]
		})
	})

	if (prisma[table]) {
		const data = await prisma[table].update({
			data: params,
			where: {
				ID: id
			}
		})
		if (data) res.json(data)
		else res.json(false)
	} else res.json(false)
})

// @desc delete  data from table
// @route Delete /api/table/:table/:id
// @access Admin

export const deleteDataTable = asyncHandler(async (req, res) => {
	const table = req.params.table
	const id = +req.params.id

	if (prisma[table]) {
		const data = await prisma[table].update({
			data: { IS_ACTIVE: false },
			where: {
				ID: id
			}
		})
		if (data) res.json(data)
		else res.json(false)
	} else res.json(false)
})
