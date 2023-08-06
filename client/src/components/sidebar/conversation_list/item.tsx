import React from 'react'
import { dateHandler } from '../../../utils/date';

export default function ConversationItem({conversation}: any) {
  return (
    <li className="list-none h-[72px] w-full dark:bg-dark_bg_1 hover:dark:bg-dark_bg_2 dark:text-dark_1 px-[10px]">
      <div className="relative w-full flex items-center justify-between py-[10px]">
        <div className="flex items-center gap-x-3">
          <div className="relative w-[50px] rounded-full overflow-hidden">
            <img
              src={conversation.picture}
              alt={conversation.name}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="w-full flex flex-col">
            <h1 className="font-bold flex items-center gap-x-2">{conversation.name}</h1>
            <div>
              <div className="flex items-center gap-x-1 dark:text-dark_text_2">
                <div className="flex-1 items-center gap-x-1 dark:text-dark_bg_2">
                  <p>{conversation.latestMessage.message}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-y-4 items-end text-xs">
          <span className="dark:text-dark_text_2">{dateHandler(conversation.latestMessage.createAt)}</span>
        </div>
      </div>
      <div className="ml-16 border-b  dark:border-b-dark_bg_2"></div>
    </li>
  );
}
