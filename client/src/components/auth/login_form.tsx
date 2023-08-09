import React from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import InputCustom from './input_custom';
import { PulseLoader } from 'react-spinners';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../redux/store';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../redux/actions/user.actions';
import { loginSchema } from '../../schemas';

export default function RegisterForm() {

  const { status, error } = useSelector((state: AppState) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: {
    email:string;
    password: string
  }) => {
    const res = await dispatch(loginUser(data) as any);

    if (res.payload) {      
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-md space-y-8 p-10 dark:bg-dark_bg_2 rounded-xl">
        <div className="text-center dark:text-dark_text_1">
          <h2 className="mt-6 text-3xl font-bold">Welcome Back</h2>
          <p className="mt-2 text-sm">Sign in</p>
        </div>
        <form className="mt-6 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <InputCustom
            name="email"
            type="email"
            placeholder="Email Address"
            register={register}
            error={errors?.email?.message}
          />
          <InputCustom
            name="password"
            type="password"
            placeholder="Password"
            register={register}
            error={errors?.password?.message}
          />
          {error && <p className="text-red-400 text-center">{error}</p>}
          <button
            className="w-full flex justify-center bg-green_1 text-gray-100 p-4 rounded-full tracking-wide font-semibold focus:outline-none hover:bg-green_2  shadow-lg cursor-pointer transition ease-in duration-3"
            type="submit"
            disabled={status === 'loading'}>
            {status === 'loading' ? <PulseLoader color="#ffff" /> : 'Sign Up'}
          </button>
          <p className="flex flex-col items-center justify-center mt-10 text-center text-md dark:text-dark_text_1">
            <span>Don&apos;t you have an account?</span>
            <Link to="/register" className="hover:underline cursor-pointer transition ease-in duration-300">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
