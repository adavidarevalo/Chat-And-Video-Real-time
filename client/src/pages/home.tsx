import React, { useEffect } from 'react'
import Sidebar from '../components/sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { getConversations } from '../redux/actions/chat.actions';

export default function HomePage() {
  
  const dispatch = useDispatch()

  const {user}: any = useSelector((state: any) => state.user)

  useEffect(() => {
    if (user.token) {
      dispatch(getConversations(user.token) as any);
    }
  }, [user]);
  
  return (
    <div className='min-h-screen dark:bg-dark_bg_1 flex items-center justify-center overflow-hidden'>
      <div className='container h-screen flex'>
        <Sidebar/>
        
      </div>
    </div>
  )
}
