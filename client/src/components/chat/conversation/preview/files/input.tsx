import React from 'react'

interface InputFilePreviewProps {
  message: string
  setMessage: React.Dispatch<React.SetStateAction<string>>
}

export default function InputFilePreview({ message, setMessage }: InputFilePreviewProps) {
  
  return (
    <div className="w-full max-w-[60%] dark:bg-dark_hover_1 rounded-lg">
      <input 
      type="text" 
      placeholder="Type a message" 
      value={message} 
      onChange={(e) => setMessage(e.target.value)} 
      className='w-full bg-transparent h-11 pl-2 focus:outline-none border-none dark:text-dark_text_1'
      />
    </div>
  );
}
