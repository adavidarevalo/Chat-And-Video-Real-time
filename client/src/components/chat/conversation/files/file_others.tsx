import React from 'react';
import { DownloadIcon } from '../../../../icons';
import { File } from '../../../../types/message.type';
import { bytesToMB } from '../../../../utils/bytes_to_mb';

interface FileOthersProps {
  type: string;
  file: File['file'];
}

const FileOthers: React.FC<FileOthersProps> = ({
  file,
  type,
}: FileOthersProps) => {
  const fileExtension = file.public_id.split('.')[1];
  const fileSize = `${type} . ${bytesToMB(file.bytes)}MB`;

  return (
    <div className={`  rounded-lg pt-1 `}>
      <div className="flex justify-between gap-x-8 px-1">
        <div className="flex items-center gap-2">
          <img
            src={`images/file/${type}.png`}
            alt="Format Document"
            className="w-8 object-contain"
          />
          <div className="flex flex-col gap-2">
            <h1>{`${file.original_filename}.${fileExtension}`}</h1>
            <span className="text-sm">{fileSize}</span>
          </div>
        </div>
        <a href={file.secure_url} target="_blank" download rel="noreferrer">
          <DownloadIcon />
        </a>
      </div>
    </div>
  );
};

export default FileOthers;
