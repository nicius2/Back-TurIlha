import { Router } from 'express'
import { SessionController } from '@/controllers/sessionController'

const sessionRouter:Router = Router()
const sessionController = new SessionController()

sessionRouter.post('/login', sessionController.login)

export { sessionRouter }
