import createHttpError from 'http-errors';
import { User } from '../models';

export const findUser = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw createHttpError.BadRequest('Please fill all fields');
  }
  return user;
};
