/** @format */

import * as Yup from 'yup';

export const signUpSchema = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .matches(/^[a-zA-Z_ ]*$/)
    .min(2, 'Name must be at least 2 characters long')
    .max(20, 'Name must be less than 20 characters long'),
  email: Yup.string().required('Email is required').email('Invalid email'),
  status: Yup.string().max(64, 'Status must be less than 64 characters long'),
  password: Yup.string()
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      'Password must contain atleast 6 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character.'
    ),
});
