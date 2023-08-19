import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import InputCustom from './input_custom';
import { PulseLoader } from 'react-spinners';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from '../../redux/store';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../redux/actions/user.actions';
import Picture from './picture';
import axios from 'axios';
import { changeStatus } from '../../redux/slices/user.slice';
import { signUpSchema } from '../../schemas';

export default function RegisterForm() {
  const [picture, setPicture] = useState<File | null>(null);
  const [readablePicture, setReadablePicture] = useState('');

  const { status, error } = useSelector((state: AppState) => state.user);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpSchema),
  });

  const onSubmit = async (data: {
    name: string;
    email: string;
    status?: string;
    password: string;
  }) => {
    dispatch(changeStatus('loading'));
    let defaultPicture = process.env.REACT_APP_DEFAULT_AVATAR;
    if (picture) {
      const pictureUploaded = await uploadImage();
      defaultPicture = pictureUploaded?.secure_url;
    }
    const res = await dispatch(
      registerUser({ ...data, picture: defaultPicture }),
    );
    if (res?.payload?.user) {
      navigate('/');
    }
  };

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append('upload_preset', `${process.env.REACT_APP_CLOUD_SECRET}`);
    formData.append('file', picture as File);
    const { data } = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
      formData,
    );
    return data;
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-md space-y-8 p-10 dark:bg-dark_bg_2 rounded-xl">
        <div className="text-center dark:text-dark_text_1">
          <h2 className="mt-6 text-3xl font-bold">Welcome Back</h2>
          <p className="mt-2 text-sm">Sign up</p>
        </div>
        <form className="mt-6 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <InputCustom
            name="name"
            type="text"
            placeholder="Full Name"
            register={register}
            error={errors?.name?.message}
          />
          <InputCustom
            name="email"
            type="email"
            placeholder="Email Address"
            register={register}
            error={errors?.email?.message}
          />
          <InputCustom
            name="status"
            type="text"
            placeholder="Status (Optional)"
            register={register}
            error={errors?.status?.message}
          />
          <InputCustom
            name="password"
            type="password"
            placeholder="Password"
            register={register}
            error={errors?.password?.message}
          />
          <Picture
            readablePicture={readablePicture}
            setPicture={setPicture}
            setReadablePicture={setReadablePicture}
          />

          {error && <p className="text-red-400 text-center">{error}</p>}
          <button
            className="w-full flex justify-center bg-green_1 text-gray-100 p-4 rounded-full tracking-wide font-semibold focus:outline-none hover:bg-green_2  shadow-lg cursor-pointer transition ease-in duration-3"
            type="submit"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? <PulseLoader color="#ffff" /> : 'Sign Up'}
          </button>
          <p className="flex flex-col items-center justify-center mt-10 text-center text-md dark:text-dark_text_1">
            <span>Have an Account?</span>
            <Link
              to="/login"
              className="hover:underline cursor-pointer transition ease-in duration-300"
            >
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
