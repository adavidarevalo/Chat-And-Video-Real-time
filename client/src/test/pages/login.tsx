import React from 'react';
import LoginForm from '../../components/auth/login_form';

export default function LoginPage() {
  return (
    <div className="h-screen dark:bg-dark_bg_1 flex items-center justify-center py-[19] overflow-hidden">
      <div className="flex w-[1600px] max-auto h-full">
        <LoginForm />
      </div>
    </div>
  );
}
