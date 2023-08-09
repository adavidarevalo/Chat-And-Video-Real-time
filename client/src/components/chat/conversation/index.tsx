import React, { useEffect } from 'react'
import ChatHeader from './header';
import ChatMessages from './messages';
import { useDispatch, useSelector } from 'react-redux';
import { getConversationMessages } from '../../../redux/actions/chat.actions';
import ChatActions from './actions';
import { AppState } from '../../../redux/store';

export default function ConversationContainer() {
  const dispatch = useDispatch()

      const { activeConversation } = useSelector((state: AppState) => state.chat);
      const { user } = useSelector((state: AppState) => state.user);

      const values = {
        token: user?.token,
        conversation_id: activeConversation._id,
      };

      useEffect(() => {
        if (activeConversation?._id) {
          dispatch(getConversationMessages(values) as any);
        }
      }, [activeConversation]);
      
  return (
    <div className="relative h-full w-full dark:bg-dark_bg_4 select-none border-1 dark:border-l-dark_border_1 border-b-green_2 select-none overflow-hidden">
      <div>
        <ChatHeader/>
        <ChatMessages/>
        <ChatActions/>
      </div>
    </div>
  );
}
