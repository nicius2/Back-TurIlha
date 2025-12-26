import { authenticateWithGoogle } from "@/controllers/authGoogle";
import { Router } from "express";

const authGoogleRouter: Router = Router()

authGoogleRouter.post('/google', authenticateWithGoogle)

export { authGoogleRouter }
