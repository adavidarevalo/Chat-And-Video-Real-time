import { User } from '../types/user.type';

export const getConversationId = (user: User, users: User[]) => {
  return users[0]._id === user._id ? users[1]._id : users[0]._id;
};

export const getConversationName = (user: User, users: User[]) => {
  return users[0]._id === user._id ? users[1].name : users[0].name;
};

export const getConversationPicture = (user: User, users: User[]) => {
  return users[0]._id === user._id ? users[1].picture : users[0].picture;
};
