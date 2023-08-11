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
};
