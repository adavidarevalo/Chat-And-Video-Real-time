import jwt from 'jsonwebtoken';
import logger from '../config/logger.config';

export const singToken = (
  id: string,
  expiresIn: string = '1d',
  token?: string
) => {
  const secretToken = token || process.env.JWT_SECRET;
  return jwt.sign({ id }, `${secretToken}`, { expiresIn });
};

export const decodeToken = (token: string) => {
  return jwt.verify(token, `${process.env.JWT_SECRET}`);
};

export const verify = async (token: string, secret: string) => {
  try {
    const check = await jwt.verify(token, secret);
    return check;
  } catch (error) {
    logger.error(error);
    return null;
  }
};
