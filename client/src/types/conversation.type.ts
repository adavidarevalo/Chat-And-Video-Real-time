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
  isGroup: boolean;
  users: User[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  latestMessage: LatestMessage;
}

export interface LatestMessage {
  _id: string;
  sender: Sender;
  message: string;
  conversation: string;
  file: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
