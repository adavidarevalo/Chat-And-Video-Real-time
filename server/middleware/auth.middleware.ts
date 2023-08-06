import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';

export const authMiddleware = (
  req: Request & { user?: any },
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.headers['authorization']) {
      return next(createHttpError.Unauthorized());
    }

    const token = req.headers.authorization.split(' ')[1];

    const tokenContent = jwt.verify(token, `${process.env.JWT_SECRET}`);

    if (!tokenContent) {
      return next(createHttpError.Unauthorized());
    }

    req.user = tokenContent;
    next();
  } catch (error) {
    next(createHttpError.Unauthorized());
  }
};
