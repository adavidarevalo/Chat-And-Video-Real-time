import moment from 'moment';
import React from 'react'
import { TriangleIcon } from '../../../icons';
import MessageType from '../../../types/message.type';
import { BeatLoader } from 'react-spinners';


export default function Typing() {
  return (
    <div className={`w-full flex mt-2 space-x-3 max-w-xs`}>
      <div>
        <div className={`relative h-full dark:text-dark_text_1 p-2 rounded-lg min-w-[54px] dark:bg-dark_bg_2`}>
          <div className="float-left h-full text-sm py-2  px-[5px]">
            <BeatLoader color="#36d7b7" size={10} />
          </div>
          <span>
            <TriangleIcon className="dark:fill-dark_bg_2 rotate-[30deg] absolute top-[0px] -left-1.5" />
          </span>
        </div>
      </div>
    </div>
  );
}
