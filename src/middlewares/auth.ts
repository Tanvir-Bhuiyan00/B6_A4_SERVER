import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { secret } from "../modules/Auth/auth.service";
import { prisma } from "../lib/prisma";

export enum UserRole {
  admin = "ADMIN",
  student = "STUDENT",
  tutor = "TUTOR",
}

const auth = (...roles: UserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.cookies?.token;
      if (!token) {
        throw new Error("Token not found!!");
      }

      const decoded = jwt.verify(token, secret) as JwtPayload;

      const userData = await prisma.user.findUnique({
        where: {
          email: decoded.email,
        },
      });
      if (!userData) {
        throw new Error("Unauthorized!");
      }

      if (userData.isBanned === true) {
        throw new Error("Unauthorized!!, You are Banned!!!");
      }

      if (roles.length && !roles.includes(decoded.role)) {
        throw new Error("Unauthorized!!!");
      }

      req.user = decoded;

      next();
    } catch (error: any) {
      next(error);
    }
  };
};

export default auth;
