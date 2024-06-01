import asyncHandler from 'express-async-handler'
import { prisma } from '../prisma.js'

// @desc Add staff in group
// @route POST /api/staff-group/
// @access Admin

export const addStaffInGroup = asyncHandler(async (req, res) => {
	const { staffId, groupId } = req.body

	const isExistStaffGroup = await prisma.staff_group.findFirst({
		where: {
			staff: {
				ID: +staffId
			},
			work_group: {
				ID: +groupId
			}
		}
	})

	if (isExistStaffGroup) {
		throw new Error('Staff already in group')
	}

	const staffGroup = await prisma.staff_group.create({
		data: {
			staff: {
				connect: {
					ID: +staffId
				}
			},
			work_group: {
				connect: {
					ID: +groupId
				}
			}
		},
		include: {
			staff: true,
			work_group: true
		}
	})
	if (!staffGroup) {
		res.status(404)
		throw new Error('Can not add staff in group')
	}
	res.json(staffGroup)
})

// @desc Remove staff from group
// @route DELETE /api/staff-group/
// @access Admin

export const removeStaffFromGroup = asyncHandler(async (req, res) => {
	const { staffId, groupId } = req.body
	try {
		const staffGroupId = await prisma.staff_group.findFirst({
			where: {
				staff: {
					ID: +staffId
				},
				work_group: {
					ID: +groupId
				}
			}
		})

		if (!staffGroupId) {
			throw new Error('Staff group not deleted')
		}

		const staffGroup = await prisma.staff_group.delete({
			where: {
				ID: staffGroupId.ID
			},
			include: {
				staff: true,
				work_group: true
			}
		})

		res.json(staffGroup)
	} catch (error) {
		res.status(404)
		throw new Error('Staff group not deleted')
	}
})
