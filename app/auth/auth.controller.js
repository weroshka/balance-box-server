import { hash, verify } from 'argon2'
import asyncHandler from 'express-async-handler'
import { prisma } from '../prisma.js'
import { generateToken } from './generate-token.js'

// @desc Auth staff
// @route POST /api/auth/login/
// @access Public

export const authStaff = asyncHandler(async (req, res) => {
	const { email, password } = req.body

	const staff = await prisma.staff.findUnique({
		where: {
			EMAIL: email,
			IS_ACTIVE: true
		},
		select: {
			ID: true,
			PASSWORD: true
		}
	})

	if (!staff) {
		res.status(401)
		throw new Error('Пользователя с данным почтой не существует')
	}

	const isValidPassword = await verify(staff.PASSWORD, password)

	if (!isValidPassword) {
		res.status(401)
		throw new Error('Неправильный пароль')
	}

	res.json({ staff, token: generateToken(staff.ID) })
})

// @desc Register staff
// @route POST /api/auth/register/
// @access Public

export const registerStaff = asyncHandler(async (req, res) => {
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
			ID: true
		}
	})

	res.json({ staff, token: generateToken(staff.ID) })
})
