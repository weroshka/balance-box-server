import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import { prisma } from '../prisma.js'

export const auth = asyncHandler(async (req, res, next) => {
	let token
	if (req.headers.authorization?.startsWith('Bearer')) {
		token = req.headers.authorization.split(' ')[1]

		const decoded = jwt.verify(token, process.env.JWT_SECRET)

		const staff = await prisma.staff.findUnique({
			where: {
				ID: decoded.staffId
			},
			select: {
				ID: true,
				SURNAME: true,
				NAME: true,
				FATHER_NAME: true,
				EMAIL: true,
				IS_ADMIN: true,
				expense: true,
				staff_group: {
					select: {
						ID: true,
						work_group: true
					}
				}
			}
		})

		if (staff) {
			req.staff = staff
			next()
		} else {
			res.status(401)
			throw new Error('Not authorization token failed')
		}
	}

	if (!token) {
		res.status(401)
		throw new Error('Not authorization, do not have a token')
	}
})

export const isAdmin = asyncHandler(async (req, res, next) => {
	const staff = req.staff
	if (staff && staff.IS_ADMIN) {
		next()
	} else {
		res.status(401)
		throw new Error(`Access denied`)
	}
})
