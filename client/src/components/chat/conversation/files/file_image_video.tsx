import React from 'react';

interface FileImageVideoProps {
  url: string;
  type: string;
}

const FileImageVideo: React.FC<FileImageVideoProps> = ({ url, type }) => {
  if (type === 'IMAGE') {
    return <img src={url} alt="" className="cursor-pointer rounded-md" />;
  } else {
    return <video src={url} controls />;
  }
};

export default FileImageVideo;
