import React from 'react'
import { AttachmentIcon } from '../../../../../icons'
import AttachmentsMenu from './menu';

interface AttachmentsProps {
  showEmoji: boolean;
  setShowEmoji: React.Dispatch<React.SetStateAction<boolean>>;
  setShowAttachments: React.Dispatch<React.SetStateAction<boolean>>;
  showAttachments: boolean;
}

export default function Attachments({ showEmoji, setShowEmoji, showAttachments, setShowAttachments }: AttachmentsProps) {
  return (
    <li className="relative">
      <button
        type="button"
        className="btn"
        onClick={() => {
          if (showEmoji) {
            setShowEmoji(false);
          }
          setShowAttachments((prev) => !prev);
        }}>
        <AttachmentIcon className="dark:fill-dark_svg_1" />
      </button>
      {showAttachments && <AttachmentsMenu />}
    </li>
  );
}
