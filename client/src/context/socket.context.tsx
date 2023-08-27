import React, { ReactNode, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { createContext, useContext } from 'react';

interface SocketContextType {
  socket: Socket;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const socket = io(
    `${process.env.REACT_APP_API_ENDPOINT?.replace('/api/v1', '')}`,
  ) as Socket;
  
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;
