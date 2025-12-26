import { ResetPassword } from "@/controllers/resetPassword";
import { Router } from "express";

const resetPasswordRouter:Router = Router();

const resetPassword = new ResetPassword();

resetPasswordRouter.post("/forgot-password", resetPassword.ForgotPassword);
resetPasswordRouter.put("/reset-password", resetPassword.resetPassword);

export { resetPasswordRouter }
