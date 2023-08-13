import React, { useRef, useState } from 'react';
import { CloseIcon } from '../../icons';

interface PictureProps {
  readablePicture: string;
  setPicture: any;
  setReadablePicture: React.Dispatch<React.SetStateAction<string>>;
}

export default function Picture({ readablePicture, setPicture, setReadablePicture }: PictureProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState('');

  const handlePicture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pic = e.target.files![0];

      if (!['image/jpeg', 'image/png', 'image/webp'].includes(pic.type)) {
        setError(`${pic.name} format is not supported.`);
        return;
      }

    if (pic.size > 1024 * 1024 * 5) {
      setError(`${pic.name} is too large, maximum 5mb allowed.`);
      return;
    }
    setError('');
    setPicture(pic);
    const reader = new FileReader();
    reader.readAsDataURL(pic);
    reader.onload = (e: any) => {
      setReadablePicture(e.target.result);
    };
  };

  const handleChangePic = () => {
    setPicture('');
    setReadablePicture('');
    inputRef?.current?.click();
  };

  const handleDeleteImage = () => {
    setError('');
    setPicture('');
    setReadablePicture('');
  };

  return (
    <div className="mt-8 content-center dark:text-dark_text_1 space-y-1">
      <label htmlFor="picture" className="text-sm font-bold tracking-wide">
        Picture (Optional)
      </label>
      {readablePicture ? (
        <div>
          <div className="relative w-[80px]">
            <div className="absolute bg-dark_svg_2 rounded-full right-0" onClick={handleDeleteImage}>
              <CloseIcon className="" />
            </div>
            <img src={readablePicture} alt={'avatar'} className="w-20 h-20 object-cover rounded-full" />
          </div>
          <div
            className="mt-2 py-1 w-20 dark:bg-dark_bg_3 transition hover:dark:bg-dark_bg_4 rounded-md text-xs flex items-center justify-center cursor-pointer"
            onClick={handleChangePic}
          >
            Change
          </div>
        </div>
      ) : (
        <div
          className="w-full h-12 dark:bg-dark_bg_3 transition hover:dark:bg-dark_bg_4 rounded-md font-bold flex items-center justify-center cursor-pointer"
          onClick={() => inputRef?.current?.click()}
        >
          Upload Picture
        </div>
      )}
      <input
        type="file"
        name="picture"
        id="picture"
        hidden
        ref={inputRef}
        accept={'image/png,image/jpeg,image/webp'}
        onChange={handlePicture}
      />
      <div className="mt-2">
        <p className="text-red-400">{error}</p>
      </div>
    </div>
  );
}
