import React from 'react';
import RegisterForm from '../components/auth/register_form';

export default function RegisterPage() {
  return (
    <div className="m-h-screen dark:bg-dark_bg_1 flex items-center justify-center py-[19] overflow-hidden">
      <div className="flex w-[1600px] max-auto h-full">
        <RegisterForm />
      </div>
    </div>
  );
}
