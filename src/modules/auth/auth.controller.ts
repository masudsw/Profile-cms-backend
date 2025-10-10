import { Request, Response } from "express";
import { AuthService } from "./auth.service";

const loginWithEmailAndPassword = async (req: Request, res: Response) => {
    try {
        const result = await AuthService.loginWithEmailAndPassword(req.body)
        res.cookie("accessToken", result.accessToken, {
            httpOnly: true,
            secure: true
        })
        res.status(200).json(result);

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        let statusCode = 500;
        if (errorMessage === "User not found!" || errorMessage === "Password is incorrect!") {
            statusCode = 401;
        }
        res.status(statusCode).json({
            success: false,
            message: errorMessage,
        });
    }
}

const logout = async (req: Request, res: Response) => {

    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
    })
    res.status(200).json({
        success: true,
        message: "User logout successfully",
    });
}



const authWithGoogle = async (req: Request, res: Response) => {
    try {
        const result = await AuthService.authWithGoogle(req.body)
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(error)
    }
}

export const AuthController = {
    loginWithEmailAndPassword,
    authWithGoogle,
    logout
}