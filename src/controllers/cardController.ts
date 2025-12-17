import { prisma } from "@/lib/prisma.js";
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
}

export { CardController };
