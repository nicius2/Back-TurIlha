import { Router } from "express";
import { userRouter } from "./userRouter";

const routes = Router();

routes.use("/", userRouter);

export { routes };