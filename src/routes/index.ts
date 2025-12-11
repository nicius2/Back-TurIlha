import { Router } from "express";
import { cardsRouter } from "../routes/cardsRouter"

const routes: Router = Router()

routes.use("/cards", cardsRouter)

export { routes }