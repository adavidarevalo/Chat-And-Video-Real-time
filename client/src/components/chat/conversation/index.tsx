import React, { useEffect, useMemo } from 'react';
import ChatHeader from './header';
import ChatMessages from './messages';
import { useDispatch, useSelector } from 'react-redux';
import { getConversationMessages } from '../../../redux/actions/chat.actions';
import ChatActions from './actions';
import { AppDispatch, AppState } from '../../../redux/store';
import { getConversationId } from '../../../utils/get_conversation';
import FilesPreview from './preview/files';
import { User } from '../../../types/user.type';

interface ConversationContainerProps {
  callUser: () => void
}

export default function ConversationContainer({ callUser }: ConversationContainerProps) {
  const dispatch = useDispatch<AppDispatch>();

  const { activeConversation, onlineUsers, files } = useSelector(
    (state: AppState) => state.chat,
    );

  const { user } = useSelector((state: AppState) => state.user);

  useEffect(() => {
    if (activeConversation?._id) {
      const values = {
        token: user?.token,
        conversation_id: activeConversation?._id,
      };

    dispatch(getConversationMessages(values));
    }
  }, [activeConversation]);

  const insOnline = useMemo(() => {
    return onlineUsers.some(
      ({ userId }) =>
        userId ===
        getConversationId(user as User, activeConversation?.users as User[]),
    );
  }, [activeConversation, onlineUsers]);

  return (
    <div className="relative h-full w-full dark:bg-dark_bg_4 select-none border-1 dark:border-l-dark_border_1 border-b-green_2 select-none overflow-inherit">
      <div>
        <ChatHeader insOnline={insOnline} callUser={callUser} />
        {files.length > 0 ? (
          <FilesPreview />
        ) : (
          <>
            <ChatMessages />
            <ChatActions />
          </>
        )}
      </div>
    </div>
  );
}
