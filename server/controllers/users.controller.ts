import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { searchUsers as searchUsersServices } from '../services/user.service';
import logger from '../config/logger.config';

export const searchUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const keyword = req.query.search as string;

    if (!keyword) {
      logger.error('Search keyword is required');
      throw createHttpError(400, 'Search keyword is required');
    }

    const users = await searchUsersServices(keyword, (req as any).user.id);

    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
