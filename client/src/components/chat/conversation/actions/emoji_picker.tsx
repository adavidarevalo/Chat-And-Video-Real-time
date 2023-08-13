import React, { useEffect, useState } from 'react';
import { CloseIcon, EmojiIcon } from '../../../../icons';
import EmojiPicker, { EmojiClickData, Theme } from 'emoji-picker-react';

interface EmojiPickerSelectorProps {
  textRef: React.RefObject<any>;
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  showEmoji: boolean;
  setShowEmoji: React.Dispatch<React.SetStateAction<boolean>>;
  showAttachments: boolean;
  setShowAttachments: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EmojiPickerSelector({
  textRef,
  message,
  setMessage,
  showEmoji,
  setShowEmoji,
  showAttachments,
  setShowAttachments,
}: EmojiPickerSelectorProps) {
  const [cursorPosition, setCursorPosition] = useState<number>();

  useEffect(() => {
    textRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);

  const handleEmoji = (emojiData: EmojiClickData) => {
    const { emoji } = emojiData;
    const ref = textRef.current;
    ref.focus();
    const start = message.substring(0, ref.selectionStart);
    const end = message.substring(ref.selectionStart);

    setMessage(`${start}${emoji}${end}`);
    setCursorPosition(start.length + emoji.length);
  };

  return (
    <li>
      <button
        className="btn"
        type="button"
        onClick={() => {
          if (showAttachments) {
            setShowAttachments(false);
          }
          setShowEmoji((prev: boolean) => !prev);
        }}
      >
        {showEmoji ? <CloseIcon className="dark:fill-dark_svg_1" /> : <EmojiIcon className="dark:fill-dark_svg_1" />}
      </button>
      {showEmoji && (
        <div className="absolute bottom-[60px] left-[-0.5px] w-full">
          <EmojiPicker theme={Theme.DARK} onEmojiClick={handleEmoji} />
        </div>
      )}
    </li>
  );
}
