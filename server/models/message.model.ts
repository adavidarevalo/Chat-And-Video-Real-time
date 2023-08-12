import { Schema, model, Document } from 'mongoose';

interface MessageDocument extends Document {
  name: string;
  isGroup: boolean;
  users: {
    _id: string;
  }[];
  latestMessage: string;
  admin: string;
}

const MessageSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    message: {
      type: String,
      trim: true,
    },
    conversation: {
      type: Schema.Types.ObjectId,
      ref: 'Conversation',
    },
    files: [],
  },
  {
    collection: 'message',
    timestamps: true,
  }
);

export const Message = model<MessageDocument>('Message', MessageSchema);
