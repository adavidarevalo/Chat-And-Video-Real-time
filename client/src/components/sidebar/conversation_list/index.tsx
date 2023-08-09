import React from 'react'
import { useSelector } from 'react-redux';
import ConversationItem from './item';
import { AppState } from '../../../redux/store';
import { Conversation } from '../../../types/conversation.type';

export default function SidebarConversation() {
    const { conversations, activeConversation } = useSelector((state: AppState) => state.chat);
    
    return (
      <div className="conversation scrollbar">
        <ul>
          {/* {(conversations || []).filter((c: any) => c.latestMessage || c._id === activeConversation._id).map((conversation: any) => ( */}
          {conversations &&
            conversations.map((conversation: Conversation) => (
              <ConversationItem key={conversation._id} conversation={conversation} />
            ))}
        </ul>
      </div>
    );
}