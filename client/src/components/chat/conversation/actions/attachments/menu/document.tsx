import React, { useRef } from 'react';
import { DocumentIcon } from '../../../../../../icons';
import { useDispatch } from 'react-redux';
import { addFiles } from '../../../../../../redux/slices/chat.slice';
import { getFileType } from '../../../../../../utils/file';
import { validDocumentsFormats } from '../../../../../../utils/upload_valid_formats';

export default function DocumentAttachment() {
  const inputRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();

  const documentHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let files = Array.from(e.target.files!);

    files.forEach((file) => {
      if (!validDocumentsFormats.includes(file.type) || file.size > 1024 * 1024 * 5) {
        files = files.filter((item) => item.name !== file.name);
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        dispatch(
          addFiles({
            file: file,
            type: getFileType(file.type),
          }),
        );
      };
    });
  };

  return (
    <li>
      <button
        type={'button'}
        className="bg-[#5F66CD] rounded-full"
        onClick={() => {
          inputRef.current?.click();
        }}
      >
        <DocumentIcon />
        <input type="file" hidden multiple ref={inputRef} accept={validDocumentsFormats} onChange={documentHandler} />
      </button>
    </li>
  );
}
