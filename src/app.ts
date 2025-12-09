import express from "express";
import { routes } from "./routes";
import "express-async-errors"

const app = express()

app.use(express.json())
app.use(routes)

export { app }