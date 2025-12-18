import { prisma } from "@/database/prisma.js";
import { Request, Response, NextFunction } from "express";

class CardController {
  async getAllCard(request: Request, response: Response, next: NextFunction) {
    try {
      const cards = await prisma.card.findMany({
        orderBy: [{ createdAt: "desc" }],
      });

      console.log('🔥 Requisição de todos os cards')
      return response.status(200).json({
        success: true,
        cards,
      });
    } catch (error) {
      next(error);
    }
  }

  async getPaisagens(request: Request, response: Response, next: NextFunction) {
    try {
      const cardsPaisagens = await prisma.card.findMany({
        where: {
          type: 'LANDSCAPE'
        }
      })

      console.log('🔥 Requisição de cards -> Paisagens')
      return response.status(200).json({
        success: true,
        cardsPaisagens,
      });
    } catch (error) {
      next(error)
    }
  }

  async getEvent(request: Request, response: Response, next: NextFunction) {
    try {
      const cardsEvent = await prisma.card.findMany({
        where: {
          type: 'EVENT'
        }
      })

      console.log('🔥 Requisição de cards -> eventos')
      return response.status(200).json({
        success: true,
        cardsEvent,
      });
    } catch (error) {
      next(error)
    }
  }
  async getRestaurant(request: Request, response: Response, next: NextFunction) {
    try {
      const cardsRestaurant = await prisma.card.findMany({
        where: {
          type: 'RESTAURANT'
        }
      })

      console.log('🔥 Requisição de cards -> Restaurantes')
      return response.status(200).json({
        success: true,
        cardsRestaurant,
      });
    } catch (error) {
      next(error)
    }
  }
}

export { CardController };
