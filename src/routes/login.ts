import express from 'express';
import { sign } from 'jsonwebtoken';
export const loginRouter = express.Router();

loginRouter.post('/', (req, res) => {
  const { login, senha } = req.body;

  if (login === process.env.LOGIN && senha === process.env.PASS) {
    const secret = process.env.JWT_SECRET || 'se5ysrths5yhsrthse5hse5h4sy5hhgw4hsr';
    
    const token = sign({ login, senha }, secret, {
      expiresIn: '15m',
    });

    return res.status(201).json({
      success: true,
      token,
    });
  }

  return res.status(401).json({
    success: false,
    message: 'Login inválido',
  });
});