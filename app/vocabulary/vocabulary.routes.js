import Router from 'express'
import { auth, isAdmin } from '../middleware/auth.middleware.js'
import {
	addVocabulary,
	deleteVocabulary,
	getAllVocabulary,
	getVocabulary,
	updateVocabulary
} from './vocabulary.controller.js'

const router = Router()

router.route('/').post(auth, isAdmin, addVocabulary)

router.route('/all').get(auth, isAdmin, getAllVocabulary)

router
	.route('/:key/')
	.get(auth, isAdmin, getVocabulary)
	.put(auth, isAdmin, updateVocabulary)
	.delete(auth, isAdmin, deleteVocabulary)

export default router
