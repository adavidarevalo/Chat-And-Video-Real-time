import React, { useEffect, useMemo } from 'react'
import ChatHeader from './header';
import ChatMessages from './messages';
import { useDispatch, useSelector } from 'react-redux';
import { getConversationMessages } from '../../../redux/actions/chat.actions';
import ChatActions from './actions';
import { AppState } from '../../../redux/store';
import { getConversationId } from '../../../utils/get_conversation';

export default function ConversationContainer() {
  const dispatch = useDispatch();

  const { activeConversation, onlineUsers } = useSelector((state: AppState) => state.chat);
  const { user } = useSelector((state: AppState) => state.user);

  const values = {
    token: user?.token,
    conversation_id: activeConversation?._id,
  };

  useEffect(() => {
    if (activeConversation?._id) {
      dispatch(getConversationMessages(values) as any);
    }
  }, [activeConversation]);

  const insOnline = useMemo(() => {
    return onlineUsers.some(({ userId }) => userId === getConversationId(user as any, activeConversation?.users as any));
  }, [activeConversation]);

  return (
    <div className="relative h-full w-full dark:bg-dark_bg_4 select-none border-1 dark:border-l-dark_border_1 border-b-green_2 select-none overflow-hidden">
      <div>
        <ChatHeader insOnline={insOnline} />
        <ChatMessages />
        <ChatActions />
      </div>
    </div>
  );
}
