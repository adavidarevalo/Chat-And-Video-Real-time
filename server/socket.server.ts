import { Server, Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

let onlineUsers: {
  userId: string;
  socketId: string;
}[] = [];

export default (
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>,
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) => {
  socket.on('join', (userId: string) => {
    socket.join(userId);
    if (!onlineUsers.some((user) => user.userId === userId)) {
      onlineUsers.push({
        userId,
        socketId: socket.id,
      });
    }

    io.emit('get online users', onlineUsers);
    io.emit('setup socket', socket.id);
  });

  socket.on('disconnect', () => {
    onlineUsers = onlineUsers.filter(({ socketId }) => socketId !== socket.id);
    io.emit('get online users', onlineUsers);
  });

  socket.on('join conversation', (conversation_id: string) => {
    socket.join(conversation_id);
  });

  socket.on('send message', (message) => {
    const conversation = message.conversation;
    if (!conversation.users) return;

    conversation.users.forEach((user: any) => {
      if (user._id === message.sender._id) return;
      socket.in(user._id).emit('receive message', message);
    });
  });

  socket.on('typing', (conversation_id) => {
    socket.in(conversation_id).emit('typing', conversation_id);
  });

  socket.on('stop typing', (conversation_id) => {
    socket.in(conversation_id).emit('stop typing', conversation_id);
  });

  socket.on('call user', (callData) => {
    const userId = callData.userToCall;
    const userSocketId = onlineUsers.find((user) => user.userId === userId);

    if (userSocketId) {
      io.to(userSocketId.socketId).emit('call user', {
        signal: callData.signal,
        from: callData.from,
        name: callData.name,
        picture: callData.picture,
      });
    }
  });

  socket.on('answer call', (data) => {
    io.to(data.to).emit('call accepted', data.signal);
  });

  socket.on('end call', (socketId) => {
    io.to(socketId).emit('end call');
  });
};
