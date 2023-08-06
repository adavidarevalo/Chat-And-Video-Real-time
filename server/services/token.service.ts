import { singToken, verify } from '../utils/token';

export const generateToken = async (
  payload: string,
  expiresIn?: string,
  secret?: string
) => {
  const token = await singToken(payload, expiresIn, secret);

  return token;
};

export const verifyToken = async (token: string, secretKey: string) => {
  const check = await verify(token, secretKey);
  return check;
};
