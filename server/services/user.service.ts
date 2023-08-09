import createHttpError from 'http-errors';
import { User } from '../models';

export const findUser = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw createHttpError.BadRequest('Please fill all fields');
  }
  return user;
};

export const searchUsers = async (keyword: string, userId: string) => {
  const query: any = {};

  if (keyword) {
    query['$or'] = [
      { name: { $regex: keyword, $options: 'i' } },
      { email: { $regex: keyword, $options: 'i' } },
    ];
  }

  query['_id'] = { $ne: userId };

  const users = await User.find(query).select('-password');

  return users;
};
