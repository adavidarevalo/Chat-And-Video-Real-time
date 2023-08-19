import { UseFormRegister } from 'react-hook-form';

export interface InputCustomProps {
  name: string;
  type: 'text' | 'email' | 'number' | 'password';
  placeholder: string;
  error?: string;
  register: UseFormRegister<any> | null;
}

export default function InputCustom({
  name,
  type,
  placeholder,
  error,
  register,
}: InputCustomProps) {
  return (
    <div className="mt-8 content-center dark:text-dark_text_1 space-y-1">
      <label htmlFor={name} className="text-sm font-bold tracking-wide">
        {placeholder}
      </label>
      <input
        type={type}
        {...(register && register(name))}
        placeholder={placeholder}
        data-testid="input-custom"
        className="w-full dark:bg-dark_bg_3 text-base py-2 px-4 rounded-lg outline-none"
      />
      {error && <p className="text-red-400">{error}</p>}
    </div>
  );
}
