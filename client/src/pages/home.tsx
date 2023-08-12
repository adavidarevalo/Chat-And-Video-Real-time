import React, { useEffect } from 'react'
import Sidebar from '../components/sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { getConversations } from '../redux/actions/chat.actions';
import {WelcomeWhatsappHome} from "./../components/chat/welcome"
import ConversationContainer from '../components/chat/conversation';
import { AppState } from '../redux/store';
import { useSocket } from '../context/socket.context';
import {
  removeConversationTyping,
  addConversationTyping,
  setOnlineUsers,
  updateMessages,
} from '../redux/slices/chat.slice';

export default function HomePage() {
  
  const dispatch = useDispatch()

  const socket = useSocket();

  const {user} = useSelector((state: AppState) => state.user)
  const { activeConversation, onlineUsers } = useSelector((state: AppState) => state.chat);

  useEffect(() => {
    socket?.socket.emit("join", user?._id )
    socket?.socket.on('get online users', (users) => {
      dispatch(setOnlineUsers(users));
    });
  }, [user]);

  useEffect(() => {
    socket?.socket.on("receive message", (message) => {
        dispatch(updateMessages(message));
    })
    socket?.socket.on('typing', conversationId => {      
      dispatch(addConversationTyping(conversationId));
    });
    socket?.socket.on('stop typing', conversationId => {
      dispatch(removeConversationTyping(conversationId));
    });
  }, [])

  useEffect(() => {
    if (user?.token) {
      dispatch(getConversations(user?.token) as any);
    }
  }, [user]);
  
  return (
    <div className="min-h-screen dark:bg-dark_bg_1 flex items-center justify-center overflow-hidden">
      <div className="container h-screen flex">
        <Sidebar/>
        {activeConversation?._id ? <ConversationContainer/> : <WelcomeWhatsappHome />}
      </div>
    </div>
  );
}
