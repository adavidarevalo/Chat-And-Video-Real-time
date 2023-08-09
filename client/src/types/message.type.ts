/** @format */

import { Conversation } from './conversation.type';
import { User } from './user.type';

interface Message {
  _id: string;
  sender: User;
  message: string;
  conversation: Conversation;
  file: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default Message;
