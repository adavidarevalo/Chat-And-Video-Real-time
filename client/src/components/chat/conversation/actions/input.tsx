import React from 'react'

interface InputProps {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  textRef: React.RefObject<HTMLInputElement>;
}

export default function Input({ message, setMessage, textRef }: InputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  return (
    <div className="w-full">
      <input
        ref={textRef}
        type="text"
        className="dark:bg-dark_hover_1 dark:text-dark_text_1 outline-none h-[45px] w-full flex-1 rounded-lg pl-4"
        placeholder="Type a message"
        value={message}
        onChange={handleChange}
      />
    </div>
  );
}
