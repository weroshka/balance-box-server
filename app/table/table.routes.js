import Router from 'express'
import { auth, isAdmin } from '../middleware/auth.middleware.js'
import {
	addDataTable,
	deleteDataTable,
	getDataTable,
	getElementTable,
	getStructureTable,
	updateDataTable
} from './table.controller.js'

const router = Router()

router.route('/:table').get(auth, isAdmin, getStructureTable)

router.route('/:table/all').get(auth, isAdmin, getDataTable)

router.route('/:table/add').post(auth, isAdmin, addDataTable)

router
	.route('/:table/:id')
	.get(auth, isAdmin, getElementTable)
	.put(auth, isAdmin, updateDataTable)
	.delete(auth, isAdmin, deleteDataTable)

export default router
