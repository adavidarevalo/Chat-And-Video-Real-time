import React, { useEffect } from 'react'
import Sidebar from '../components/sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { getConversations } from '../redux/actions/chat.actions';
import {WelcomeWhatsappHome} from "./../components/chat/welcome"
import ConversationContainer from '../components/chat/conversation';
import { AppState } from '../redux/store';

export default function HomePage() {
  
  const dispatch = useDispatch()

  const {user} = useSelector((state: AppState) => state.user)
  const { activeConversation } = useSelector((state: AppState) => state.chat);

  useEffect(() => {
    if (user?.token) {
      dispatch(getConversations(user?.token) as any);
    }
  }, [user]);
  
  return (
    <div className="min-h-screen dark:bg-dark_bg_1 flex items-center justify-center overflow-hidden">
      <div className="container h-screen flex">
        <Sidebar />
        {activeConversation._id
        ? (
          <ConversationContainer/>
        ) : (
          <WelcomeWhatsappHome/>
        )}
      </div>
    </div>
  );
}
