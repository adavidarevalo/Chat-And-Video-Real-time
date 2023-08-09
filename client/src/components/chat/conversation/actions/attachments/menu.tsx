import React from 'react'
import { CameraIcon, ContactIcon, DocumentIcon, PhotoIcon, PollIcon, StickerIcon } from '../../../../../icons'

export default function AttachmentsMenu() {
  return (
    <ul className='absolute bottom-14 openEmojiAnimation'>
        <li>
            <button type={"button"} className="rounded-full">
                <PollIcon className=''/>
            </button>
        </li>
        <li>
            <button type={"button"} className="bg-[#0EABF4] rounded-full">
                <ContactIcon className=''/>
            </button>
        </li>
        <li>
            <button type={"button"} className="bg-[#5F66CD] rounded-full">
                <DocumentIcon className=''/>
            </button>
        </li>
        <li>
            <button type={"button"} className="bg-[#D3396D] rounded-full">
                <CameraIcon className=''/>
            </button>
        </li>
        <li>
            <button type={"button"} className=" rounded-full">
                <StickerIcon/>
            </button>
        </li>
        <li>
            <button type={"button"} className="bg-[#BF59CF] rounded-full">
                <PhotoIcon/>
            </button>
        </li>
    </ul>
  )
}
