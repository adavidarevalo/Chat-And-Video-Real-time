import React from 'react';
import { useSelector } from 'react-redux';
import ConversationItem from './item';
import { AppState } from '../../../redux/store';
import { Conversation } from '../../../types/conversation.type';
import { getConversationId } from '../../../utils/get_conversation';
import { User } from '../../../types/user.type';

export default function SidebarConversation() {
  const { conversations, onlineUsers } = useSelector(
    (state: AppState) => state.chat,
    );

  const { user } = useSelector((state: AppState) => state.user);

  return (
    <div className="conversation scrollbar">
      <ul data-testid="conversation-list-container">
        {conversations &&
          conversations.map((conversation: Conversation) => {
            const isOnline = onlineUsers.some(
              ({ userId }) => userId === getConversationId(user as User, conversation.users)
            );
            return (
              <ConversationItem
                key={conversation._id}
                conversation={conversation}
                isOnline={isOnline}
              />
            );
          })}
      </ul>
    </div>
  );
}
