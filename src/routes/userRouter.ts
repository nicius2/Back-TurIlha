import { Router } from "express";
import { User } from "../controllers/userController.js";

const userRouter = Router()
const userController = new User()

userRouter.post('/users', userController.create)

export { userRouter }