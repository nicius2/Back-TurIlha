import express from 'express'
import 'express-async-errors'
import { errorHandling } from "@/middlewares/errorHandling" 
import dotenv from 'dotenv'
import { routes } from './routes'
import helmet from 'helmet'
import { corsMiddleware } from './config/cors.config'

dotenv.config()

const app:express.Express = express()

app.use(express.json())
app.use(helmet())

app.use(corsMiddleware)

app.use(routes)
app.use(errorHandling)

export { app }
