import express from 'express'
import middleware from '../middleware/index.mjs'
import controllers from './controllers/index.mjs'
const adminRouter = express.Router()

adminRouter.use(middleware.auth)
adminRouter.use(middleware.getUserTypeMiddleware('admin'))

// admin endpoints
adminRouter.get('/users', controllers.admin.getAllUsers)
adminRouter.delete('/users/:id', controllers.admin.deleteUser)
adminRouter.post('/users', controllers.admin.createUser)


export default adminRouter