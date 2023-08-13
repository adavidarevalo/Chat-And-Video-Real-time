import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { DotsIcon, SearchLargeIcon } from '../../../icons';
import _ from 'lodash';
import { AppState } from '../../../redux/store';

interface ChatHeaderProps {
  insOnline: boolean;
}

export default function ChatHeader({ insOnline }: ChatHeaderProps) {
  const { activeConversation, conversationTyping } = useSelector((state: AppState) => state.chat);

  const status = useMemo(() => {
    if (conversationTyping.includes(activeConversation?._id || '')) return 'Typing...';
    if (insOnline) return 'Online';
    return '';
  }, [insOnline, activeConversation, conversationTyping]);

  return (
    <div className="h-[52px] dark:bg-dark_bg_2 flex items-center p16 select-none">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          <button className="btn">
            <img
              src={activeConversation?.picture}
              alt={`${activeConversation?.name} avatar`}
              className="w-full h-full rounded-full object-cover"
            />
          </button>
          <div className="flex flex-col">
            <h1 className="dark:text-white text-md font-bold">
              {_.capitalize(activeConversation?.name.split(' ')[0])}
            </h1>
            <span className="text-xs dark:text-dark_svg_2">{status}</span>
          </div>
        </div>
        <ul className="flex items-center gap-x-2.5">
          <li>
            <button className="btn">
              <SearchLargeIcon className="dark:fill-dark_svg_1" />
            </button>
          </li>
          <li>
            <button className="btn">
              <DotsIcon className="dark:fill-dark_svg_1" />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
