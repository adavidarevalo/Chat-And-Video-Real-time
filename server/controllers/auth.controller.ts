import { NextFunction, Request, Response } from 'express';
import { createUser, signUser } from '../services/auth.service';
import createHttpError from 'http-errors';
import { generateToken, verifyToken } from '../services/token.service';
import { findUser } from '../services/user.service';

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, picture, status, password } = req.body;

    const user = await createUser({
      name,
      email,
      picture,
      status,
      password,
    });

    const access_token = await generateToken(user._id);
    const refresh_token = await generateToken(
      user._id,
      '30d',
      process.env.REFRESH_JWT_SECRET
    );

    res.cookie('refreshToken', refresh_token, {
      httpOnly: true,
      path: '/api/vi/auth/refreshToken',
      maxAge: 30 * 20 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: 'Register Success',
      access_token,
      user: {
        name: user.name,
        _id: user._id,
        email: user.email,
        picture: user.picture,
        status: user.status,
        access_token,
      },
    });
  } catch (error: any) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    const user = await signUser(email, password);
    const access_token = generateToken(user._id);
    const refresh_token = generateToken(
      user._id,
      '30d',
      process.env.REFRESH_JWT_SECRET
    );

    res.cookie('refreshToken', refresh_token, {
      httpOnly: true,
      path: '/api/vi/auth/refreshToken',
      maxAge: 30 * 20 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: 'Register Success',
      access_token,
      user: {
        name: user.name,
        _id: user._id,
        email: user.email,
        picture: user.picture,
        status: user.status,
        access_token,
      },
    });
  } catch (error: any) {
    next(error);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.clearCookie('refreshToken', {
      path: '/api/vi/auth/refreshToken',
    });
    res.status(200);
  } catch (error: any) {
    next(error);
  }
};

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const refresh_token = req.cookies.refreshToken;
    if (!refresh_token) {
      throw createHttpError.Unauthorized('Please login.');
    }

    const check = await verifyToken(
      refresh_token,
      `${process.env.REFRESH_JWT_SECRET}`
    );

    if (!check) {
      throw createHttpError.Unauthorized('Please login.');
    }

    const user = await findUser((check as { id: string })?.id);
    const access_token = generateToken(user._id);
    const refresh_token_generated = generateToken(
      user._id,
      '30d',
      process.env.REFRESH_JWT_SECRET
    );

    res.cookie('refreshToken', refresh_token_generated, {
      httpOnly: true,
      path: '/api/vi/auth/refreshToken',
      maxAge: 30 * 20 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: 'Register Success',
      access_token,
      user: {
        name: user.name,
        _id: user._id,
        email: user.email,
        picture: user.picture,
        status: user.status,
        access_token,
      },
    });
  } catch (error: any) {
    next(error);
  }
};
