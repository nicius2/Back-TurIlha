import { prisma } from "@/lib/prisma.js";
import { Request, Response, NextFunction } from "express";

class CardController {
  async getAllCard(request: Request, response: Response, next: NextFunction) {
    try {
      const cards = await prisma.card.findMany({
        orderBy: [{ createdAt: "desc" }],
      });

      console.log('🔥 Requisição feita com sucesso')
      return response.status(200).json({
        success: true,
        cards,
      });
    } catch (error) {
      next(error);
    }
  }
}

export { CardController };
