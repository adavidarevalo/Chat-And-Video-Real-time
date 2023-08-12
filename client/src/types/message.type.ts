/** @format */

import { Conversation } from './conversation.type';
import { User } from './user.type';

export interface File {
  file: {
    asset_id: string;
    public_id: string;
    version: number;
    version_id: string;
    signature: string;
    resource_type: string;
    created_at: string;
    tags: any[];
    bytes: number;
    type: string;
    etag: string;
    placeholder: boolean;
    url: string;
    secure_url: string;
    folder: string;
    original_filename: string;
  };
  type: string;
}

interface Message {
  _id: string;
  sender: User;
  message: string;
  conversation: Conversation;
  file: File[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default Message;
