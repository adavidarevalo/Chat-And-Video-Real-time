import { Conversation, Message } from '../models';
import createHttpError from 'http-errors';

export const addNewMessage = async (msgData: any) => {
  const newMessage = await Message.create(msgData);

  if (!newMessage) {
    throw createHttpError.BadRequest('Something went wrong!');
  }

  const messageSaved = await newMessage.save();

  return messageSaved;
};

export const populateMessage = async (message_id: string) => {
  const msg = await Message.findById(message_id)
    .populate({
      path: 'sender',
      select: 'name picture',
      model: 'User',
    })
    .populate({
      path: 'conversation',
      select: 'name isGroup, users',
      model: 'Conversation',
      populate: {
        path: 'users',
        select: 'name email picture status',
        model: 'User',
      },
    });

  if (!msg) {
    throw createHttpError.BadRequest('Something went wrong!');
  }
  return msg;
};

export const updatedLatestMessage = async (
  conversation_id: string,
  msgId: string
) => {
  const conversation = await Conversation.findByIdAndUpdate(conversation_id, {
    latestMessage: msgId,
  });

  if (!conversation) throw createHttpError.BadRequest('Something went wrong!');

  return conversation;
};

export const getConversationMessages = async (conversation_id: string) => {
  const messages = await Message.find({
    conversation: conversation_id,
  })
    .populate('sender', 'name picture email status')
    .populate('conversation');

  if (!messages) throw createHttpError.BadRequest('Something went wrong!');

  return messages;
};
