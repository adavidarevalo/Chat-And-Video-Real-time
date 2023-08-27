import React, { useEffect, useState } from 'react';
import EmojiPicker, { EmojiClickData, Theme } from 'emoji-picker-react';
import _ from 'lodash';
import { CloseIcon, EmojiIcon } from '../../../../icons';

interface EmojiPickerSelectorProps {
  textRef: React.RefObject<HTMLInputElement> | null;
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
    if (textRef) {
      _.set(textRef, 'current.selectionEnd', cursorPosition);
    }
  }, [cursorPosition]);

  const handleEmoji = (emojiData: EmojiClickData) => {
    const { emoji } = emojiData;
    const ref = _.get(textRef, 'current');
    ref!.focus();
    const start = message.substring(0, _.get(ref, 'selectionStart') as number);
    const end = message.substring(_.get(ref, 'selectionStart') as number);

    setMessage(`${start}${emoji}${end}`);
    setCursorPosition(start.length + emoji.length);
  };

  const handleClick = () => {
    if (showAttachments) {
      setShowAttachments(false);
    }
    setShowEmoji((prev: boolean) => !prev);
  }

  return (
    <li>
      <button className="btn" type="button" onClick={handleClick}>
        {showEmoji ? (
          <CloseIcon className="dark:fill-dark_svg_1" />
        ) : (
          <EmojiIcon className="dark:fill-dark_svg_1" />
        )}
      </button>
      {showEmoji && (
        <div className="absolute bottom-[60px] left-[-0.5px] w-full">
          <EmojiPicker theme={Theme.DARK} onEmojiClick={handleEmoji} />
        </div>
      )}
    </li>
  );
}
