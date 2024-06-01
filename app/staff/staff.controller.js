import { hash } from 'argon2'
import asyncHandler from 'express-async-handler'
import { prisma } from '../prisma.js'

// @desc Get all staff
// @route GET /api/staff/all
// @access Admin

export const getAllStaff = asyncHandler(async (req, res) => {
	const staffAll = await prisma.staff.findMany({
		orderBy: {
			ID: 'asc'
		},
		select: {
			ID: true,
			SURNAME: true,
			NAME: true,
			FATHER_NAME: true,
			EMAIL: true,
			expense: true,
			staff_group: {
				select: {
					ID: true,
					work_group: true
				}
			}
		}
	})
	if (!staffAll) {
		res.status(404)
		throw new Error('Staff array empty')
	}
	res.json(staffAll)
})

// @desc Get current staff
// @route GET /api/staff/
// @access Admin

export const getCurrentStaff = asyncHandler(async (req, res) => {
	const staff = req.staff

	if (!staff) {
		res.status(404)
		throw new Error('Staff not found')
	}
	res.json(staff)
})

// @desc Get staff by id
// @route GET /api/staff/:id/
// @access Public

export const getStaff = asyncHandler(async (req, res) => {
	const id = +req.params.id

	const staff = await prisma.staff.findUnique({
		where: {
			ID: id
		},
		select: {
			ID: true,
			SURNAME: true,
			NAME: true,
			FATHER_NAME: true,
			EMAIL: true,
			expense: true,
			staff_group: {
				select: {
					ID: true,
					work_group: true
				}
			}
		}
	})
	if (!staff) {
		res.status(404)
		throw new Error('Staff not found')
	}
	res.json(staff)
})

// @desc Add staff
// @route POST /api/staff/
// @access Admin

export const addStaff = asyncHandler(async (req, res) => {
	const { surname, name, fatherName, email, password } = req.body

	const isStaffExists = await prisma.staff.findUnique({
		where: {
			EMAIL: email
		}
	})

	if (isStaffExists) {
		res.status(401)
		throw new Error('Exist staff with such email')
	}

	const staff = await prisma.staff.create({
		data: {
			SURNAME: surname,
			NAME: name,
			FATHER_NAME: fatherName,
			EMAIL: email,
			PASSWORD: await hash(password)
		},
		select: {
			ID: true,
			SURNAME: true,
			NAME: true,
			FATHER_NAME: true,
			EMAIL: true,
			expense: true,
			staff_group: {
				select: {
					ID: true,
					work_group: true
				}
			}
		}
	})
	if (!staff) {
		res.status(404)
		throw new Error('Staff not created')
	}
	res.json(staff)
})

// @desc Update staff
// @route PUT /api/staff/:id/
// @access Admin

export const updateStaff = asyncHandler(async (req, res) => {
	const { surname, name, fatherName, email, password } = req.body

	const data = {
		SURNAME: surname,
		NAME: name,
		FATHER_NAME: fatherName,
		EMAIL: email
	}

	if (password) {
		data.PASSWORD = await hash(password)
	}

	try {
		const staff = await prisma.staff.update({
			data: data,
			where: { ID: +req.params.id },
			select: {
				ID: true,
				SURNAME: true,
				NAME: true,
				FATHER_NAME: true,
				EMAIL: true,
				expense: true,
				staff_group: {
					select: {
						ID: true,
						work_group: true
					}
				}
			}
		})
		res.json(staff)
	} catch (error) {
		res.status(404)
		console.log(error)
		throw new Error('Staff not update')
	}
})

// @desc Delete staff
// @route DELETE /api/staff/:id/
// @access Admin

export const deleteStaff = asyncHandler(async (req, res) => {
	try {
		const staff = await prisma.staff.delete({
			where: { ID: +req.params.id },
			select: {
				ID: true,
				SURNAME: true,
				NAME: true,
				FATHER_NAME: true,
				EMAIL: true,
				expense: true,
				staff_group: {
					select: {
						ID: true,
						work_group: true
					}
				}
			}
		})

		res.json(staff)
	} catch (error) {
		res.status(404)
		throw new Error('Staff not deleted')
	}
})
