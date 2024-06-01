import asyncHandler from 'express-async-handler'
import { prisma } from '../prisma.js'

// @desc Get all vocabulary
// @route GET /api/vocabulary/all
// @access Admin

export const getAllVocabulary = asyncHandler(async (req, res) => {
	const vocabularyAll = await prisma.vocabulary.findMany({
		orderBy: {
			ID: 'asc'
		}
	})
	if (!vocabularyAll) {
		res.status(404)
		throw new Error('Vocabulary array empty')
	}
	res.json(vocabularyAll)
})

// @desc Get vocabulary by key
// @route GET /api/vocabulary/:key/
// @access Public

export const getVocabulary = asyncHandler(async (req, res) => {
	const key = req.params.key

	const vocabulary = await prisma.vocabulary.findFirst({
		where: {
			KEY: key
		}
	})
	if (!vocabulary) {
		res.json(false)
	} else {
		res.json(vocabulary)
	}
})

// @desc Add vocabulary
// @route POST /api/vocabulary/
// @access Admin

export const addVocabulary = asyncHandler(async (req, res) => {
	const { key, title, titleList } = req.body
	try {
		const vocabulary = await prisma.vocabulary.create({
			data: {
				KEY: key,
				TITLE: title,
				TITLE_LIST: titleList
			}
		})
		if (!vocabulary) throw new Error('Vocabulary not created')

		res.json(vocabulary)
	} catch (error) {
		res.status(404)
		throw new Error(error)
	}
})

// @desc Update vocabulary
// @route PUT /api/vocabulary/:key/
// @access Admin

export const updateVocabulary = asyncHandler(async (req, res) => {
	const key = req.params.key

	const { title, titleList } = req.body

	try {
		const vocabulary = await prisma.vocabulary.update({
			data: {
				TITLE: title,
				TITLE_LIST: titleList
			},
			where: {
				KEY: key
			}
		})
		if (!vocabulary) throw new Error('Vocabulary not created')

		res.json(vocabulary)
	} catch (error) {
		res.status(404)
		throw new Error(error)
	}
})

// @desc Delete vocabulary
// @route DELETE /api/vocabulary/:key/
// @access Admin

export const deleteVocabulary = asyncHandler(async (req, res) => {
	try {
		const vocabulary = await prisma.vocabulary.delete({
			where: { KEY: req.params.key }
		})

		res.json(vocabulary)
	} catch (error) {
		res.status(404)
		throw new Error('Vocabulary not deleted')
	}
})
