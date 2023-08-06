import { Schema, model, Document } from 'mongoose';

interface ConversationDocument extends Document {
  name: string;
  isGroup: boolean;
  users: {
    _id: string;
  }[];
  latestMessage: string;
  admin: string;
}

const ConversationSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    picture: {
      type: String,
      required: true,
    },
    isGroup: {
      type: Boolean,
      default: false,
      required: true,
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    latestMessage: {
      type: Schema.Types.ObjectId,
      ref: 'Message',
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    collection: 'conversations',
    timestamps: true,
  }
);

export const Conversation = model<ConversationDocument>(
  'Conversation',
  ConversationSchema
);
