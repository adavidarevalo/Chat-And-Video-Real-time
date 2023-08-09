import React from 'react'
import _ from "lodash"
import { dateHandler } from '../../../utils/date';
import { useDispatch, useSelector } from 'react-redux';
import { open_create_conversation } from '../../../redux/actions/chat.actions';
import { getConversationId } from '../../../utils/get_conversation_id';
import { AppState } from '../../../redux/store';
import { Conversation } from '../../../types/conversation.type';
import { User } from '../../../types/user.type';

interface ConversationItemProps {
  conversation: Conversation;
} 

export default function ConversationItem({ conversation }: ConversationItemProps) {
  const dispatch = useDispatch();

  const { user } = useSelector((state: AppState) => state.user);
  const { activeConversation } = useSelector((state: AppState) => state.chat);

  const openConversation = () => {
    const value = {
      receiver_id: getConversationId(user as User, conversation.users),
      token: user?.token || '',
    };
    dispatch(open_create_conversation(value) as any);
  };

  return (
    <li
      onClick={openConversation}
      className={`list-none h-[72px] w-full dark:bg-dark_bg_1 hover:${
        activeConversation._id !== conversation._id && 'dark:bg-dark_bg_2'
      } dark:text-dark_1 px-[10px] ${activeConversation._id === conversation._id && 'dark:bg-dark_hover_1'}`}>
      <div className="relative w-full flex items-center justify-between py-[10px]">
        <div className="flex items-center gap-x-3">
          <div className="relative w-[80px] rounded-full overflow-hidden">
            <img
              src={conversation.picture}
              alt={conversation.name}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="w-full flex flex-col">
            <h1 className="font-bold flex items-center gap-x-2 dark:text-dark_text_3">
              {_.capitalize(conversation.name)}
            </h1>
            <div>
              <div className="flex items-center gap-x-1 ">
                <div className="flex-1 items-center gap-x-1 dark:text-dark_text_2">
                  <p>{_.truncate(conversation.latestMessage.message, { length: 25 })}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-y-4 items-end text-xs">
          <span className="dark:text-dark_text_2">{dateHandler(conversation.latestMessage.updatedAt) || ''}</span>
        </div>
      </div>
      <div className="ml-14 border-b  dark:border-b-dark_bg_2"></div>
    </li>
  );
}
