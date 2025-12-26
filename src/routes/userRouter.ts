import { Router } from 'express'
import { UserController } from '@/controllers/userController'

const 
userRouter:Router = Router()
const userController = new UserController()

userRouter.post('/register', userController.register)

export { userRouter }
