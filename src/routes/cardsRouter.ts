import { CardController } from "@/controllers/cardController.js";
import { Router } from "express";

const cardsRouter:Router = Router()

const cardController = new CardController()

cardsRouter.get("/", cardController.getAllCard)
cardsRouter.get("/paisagens", cardController.getPaisagens)
cardsRouter.get("/eventos", cardController.getEvent)
cardsRouter.get("/restaurantes", cardController.getRestaurant)

export { cardsRouter }
