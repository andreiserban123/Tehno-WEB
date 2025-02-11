import express from 'express'
import middleware from '../middleware/index.mjs'

const adminRouter = express.Router()

adminRouter.use(middleware.getUserTypeMiddleware('admin'))

export default adminRouter