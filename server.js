import 'colors'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import multer from 'multer'
import authRoute from './app/auth/auth.routes.js'
import expenseRoute from './app/expense/expense.routes.js'
import marginalCostRoute from './app/marginal-cost/marginal-cost.routes.js'
import { errorHandler, notFound } from './app/middleware/error.middleware.js'
import { prisma } from './app/prisma.js'
import staffGroupRoute from './app/staff-group/staff-group.routes.js'
import staffRoute from './app/staff/staff.routes.js'
import tableRoute from './app/table/table.routes.js'
import vocabularyRoute from './app/vocabulary/vocabulary.routes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads')
	},
	filename: (req, file, cb) => {
		cb(
			null,
			Date.now() +
				'-' +
				Math.round(Math.random() * 1e9) +
				'-' +
				file.originalname
		)
	}
})

const upload = multer({ storage: storage })

async function main() {
	if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

	app.use(cors())
	app.use(express.json())

	app.use('/uploads', express.static('uploads'))

	app.use('/api/auth', authRoute)
	app.use('/api/expense', upload.single('docs'), expenseRoute)
	app.use('/api/marginal-cost', marginalCostRoute)
	app.use('/api/staff', staffRoute)
	app.use('/api/staff-group', staffGroupRoute)
	app.use('/api/table', tableRoute)
	app.use('/api/vocabulary', vocabularyRoute)

	app.use(notFound, errorHandler)

	app.listen(PORT, () =>
		console.log(
			`Server running on mode ${process.env.NODE_ENV} port ${PORT}`.blue.bold
		)
	)
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async e => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
