import { Router } from 'express'
import { User } from '../controllers/userController.js'

const userRouter:Router = Router()
const userController = new User()

userRouter.post('/register', userController.register)
userRouter.post('/login', userController.login)

export { userRouter }
