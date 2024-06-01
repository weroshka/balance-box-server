import asyncHandler from 'express-async-handler'
import { prisma } from '../../prisma.js'

// @desc Get all group
// @route GET /api/staff/group/
// @access Public

export const getAllGroup = asyncHandler(async (req, res) => {
	const groupAll = await prisma.work_group.findMany({
		orderBy: {
			NAME: 'asc'
		},
		include: {
			staff_group: {
				select: {
					ID: true,
					staff: {
						select: {
							ID: true,
							SURNAME: true,
							NAME: true,
							FATHER_NAME: true,
							EMAIL: true
						}
					}
				}
			}
		}
	})
	if (!groupAll) {
		res.status(404)
		throw new Error('Staff group not found')
	}
	res.json(groupAll)
})

// @desc Get group by id
// @route GET /api/staff/group/:id/
// @access Public

export const getGroup = asyncHandler(async (req, res) => {
	const id = +req.params.id
	const group = await prisma.work_group.findUnique({
		where: {
			ID: id
		},
		include: {
			staff_group: {
				select: {
					ID: true,
					staff: {
						select: {
							ID: true,
							SURNAME: true,
							NAME: true,
							FATHER_NAME: true,
							EMAIL: true
						}
					}
				}
			}
		}
	})
	if (!group) {
		res.status(404)
		throw new Error('Staff group not found')
	}
	res.json(group)
})

// @desc Add group
// @route POST /api/staff/group/:id/
// @access Admin

export const addGroup = asyncHandler(async (req, res) => {
	const { name } = req.body
	const group = await prisma.work_group.create({
		data: {
			NAME: name
		},
		include: {
			staff_group: {
				select: {
					ID: true,
					staff: {
						select: {
							ID: true,
							SURNAME: true,
							NAME: true,
							FATHER_NAME: true,
							EMAIL: true
						}
					}
				}
			}
		}
	})
	if (!group) {
		res.status(404)
		throw new Error('Staff group not found')
	}
	res.json(group)
})

// @desc Update group
// @route PUT /api/staff/group/:id/
// @access Admin

export const updateGroup = asyncHandler(async (req, res) => {
	try {
		const group = await prisma.work_group.update({
			data: {
				NAME: req.body.name
			},
			where: {
				ID: +req.params.id
			},
			include: {
				staff_group: {
					select: {
						ID: true,
						staff: {
							select: {
								ID: true,
								SURNAME: true,
								NAME: true,
								FATHER_NAME: true,
								EMAIL: true
							}
						}
					}
				}
			}
		})

		res.json(group)
	} catch (error) {
		res.status(404)
		throw new Error('Staff group not found')
	}
})

// @desc Delete group
// @route DELETE /api/staff/group/:id/
// @access Admin

export const deleteGroup = asyncHandler(async (req, res) => {
	try {
		const group = await prisma.work_group.delete({
			where: { ID: +req.params.id },
			include: {
				staff_group: {
					select: {
						ID: true,
						staff: {
							select: {
								ID: true,
								SURNAME: true,
								NAME: true,
								FATHER_NAME: true,
								EMAIL: true
							}
						}
					}
				}
			}
		})

		res.json(group)
	} catch (error) {
		res.status(404)
		throw new Error('Staff group not found')
	}
})
