import React from 'react';
import {
  CameraIcon,
  ContactIcon,
  PollIcon,
  StickerIcon,
} from '../../../../../../icons';
import PhotoAttachment from './photo';
import DocumentAttachment from './document';

export default function AttachmentsMenu() {
  return (
    <ul className="absolute bottom-14 openEmojiAnimation">
      <li>
        <button type={'button'} className="rounded-full">
          <PollIcon className="" />
        </button>
      </li>
      <li>
        <button type={'button'} className="bg-[#0EABF4] rounded-full">
          <ContactIcon className="" />
        </button>
      </li>
      <DocumentAttachment />
      <li>
        <button type={'button'} className="bg-[#D3396D] rounded-full">
          <CameraIcon className="" />
        </button>
      </li>
      <li>
        <button type={'button'} className=" rounded-full">
          <StickerIcon />
        </button>
      </li>
      <PhotoAttachment />
    </ul>
  );
}
