import { CardController } from "@/controllers/cardController.js";
import { Router } from "express";

const cardsRouter:Router = Router()

const cardController = new CardController()

cardsRouter.get("/", cardController.getAllCard)
cardsRouter.get("/paisagens", cardController.getPaisagens)

export { cardsRouter }
