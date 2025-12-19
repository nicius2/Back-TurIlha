import { Router } from "express";
import { cardsRouter } from "@/routes/cardsRouter"
import { userRouter } from "@/routes/userRouter";
import { sessionRouter } from "@/routes/sessionRouter";

const routes: Router = Router()

routes.use("/cards", cardsRouter)
routes.use("/user", userRouter)
routes.use("/session", sessionRouter)

export { routes }