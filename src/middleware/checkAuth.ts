import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../helper/jwt";
import { JwtPayload } from "jsonwebtoken";

export const checkAuth = () => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessToken = req.cookies?.accessToken;
    if (!accessToken) {
      return res.status(401).json({
        success: false,
        message: "No token received",
      });
    }

    const verifiedToken = verifyToken(
      accessToken,
      process.env.JWT_ACCESS_SECRET as string
    ) as JwtPayload;

    // ✅ Just check role and/or email
    console.log(verifiedToken.role, verifiedToken.email)
    if (verifiedToken.role !== "ADMIN" || verifiedToken.email !== process.env.ADMIN_EMAIL) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    // Optional: attach info to request
    req.user = verifiedToken;
    console.log(req.user);
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
    next()
  }
};
