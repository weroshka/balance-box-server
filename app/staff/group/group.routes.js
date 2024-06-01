import Router from 'express'
import { auth, isAdmin } from '../../middleware/auth.middleware.js'
import {
	addGroup,
	deleteGroup,
	getAllGroup,
	getGroup,
	updateGroup
} from './group.controller.js'

const router = Router()

router.route('/').post(auth, isAdmin, addGroup).get(getAllGroup)

router
	.route('/:id/')
	.get(getGroup)
	.put(auth, isAdmin, updateGroup)
	.delete(auth, isAdmin, deleteGroup)

export default router
