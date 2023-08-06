import React from 'react'
import { useSelector } from 'react-redux';
import ConversationItem from './item';

export default function SidebarConversation() {
    const {conversations} = useSelector((state: any) => state.chat)
  return (
    <div className="conversation scrollbar">
      <ul>
        {(conversations || []).map((conversation: any) => (
          <ConversationItem key={conversation._id} conversation={conversation} />
        ))}
      </ul>
    </div>
  );
}