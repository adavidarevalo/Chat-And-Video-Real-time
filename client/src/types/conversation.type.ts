/** @format */

import { User } from './user.type';

export interface Sender {
  _id: string;
  name: string;
  email: string;
  picture: string;
  status: string;
}

export interface Conversation {
  _id: string;
  name: string;
  picture: string;
  isGroup?: boolean;
  users: User[];
  createdAt?: string;
  updatedAt?: string;
  __v: number;
  latestMessage: LatestMessage;
}

export interface LatestMessage {
  _id: string;
  sender: Sender;
  message: string;
  conversation: ConversationClass | string;
  file: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ConversationClass {
  _id: string;
  name: string;
  picture: string;
  users: Sender[];
}
