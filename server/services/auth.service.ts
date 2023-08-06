import createHttpError from 'http-errors';
import { User } from '../models';
import validator from 'validator';

export const createUser = async (userData: {
  name: string;
  email: string;
  password: string;
  status: string;
  picture: string;
}) => {
  const { name, email, picture, status, password } = userData;

  if (!name || !email || !password) {
    throw createHttpError.BadRequest('Please fill all fields.');
  }

  if (
    !validator.isLength(name, {
      min: 2,
      max: 25,
    })
  ) {
    throw createHttpError.BadRequest(
      'Plase make sure your name is between 2 and 16 characters.'
    );
  }

  if (status && status.length > 64) {
    throw createHttpError.BadRequest(
      'Please make sure your status is less than 64 characters.'
    );
  }

  if (!validator.isEmail(email)) {
    throw createHttpError.BadRequest(
      'Please make sure to provide a valid email address.'
    );
  }

  const checkDb = await User.findOne({ email });
  if (checkDb) {
    throw createHttpError.Conflict(
      'Please try again with a different email address, this email already exist.'
    );
  }

  if (
    !validator.isLength(password, {
      min: 6,
      max: 128,
    })
  ) {
    throw createHttpError.BadRequest(
      'Please make sure your password is between 6 and 128 characters.'
    );
  }

  const user = await new User({
    name,
    email,
    picture: picture || process.env.DEFAULT_PICTURE,
    status: status || process.env.DEFAULT_STATUS,
    password,
  }).save();

  return user;
};

export const signUser = async (email: string, password: string) => {
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    throw createHttpError.NotFound('Invalid Credentials.');
  }

  const passMatches = await user.matchPasswords(password);

  if (!passMatches) {
    throw createHttpError.NotFound('Invalid Credentials.');
  }

  return user;
};
