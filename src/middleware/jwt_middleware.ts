import { verify } from "jsonwebtoken";
import { NextFunction } from "express";
export const verifyToken = (req, res, next: NextFunction) => {
  const auth = req.headers.authorization;
  const secret = process.env.JWT_SECRET || 'se5ysrths5yhsrthse5hse5h4sy5hhgw4hsr';
  
  const token = auth.split('Bearer ')[1];

  const decoded = verify(token, secret) as any;

  if (Date.now() >= decoded.exp * 1000) {
    return res.status(401);
  }

  req.user = decoded.login;

  next();
};