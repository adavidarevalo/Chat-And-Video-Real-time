import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import logger from '../config/logger.config';
import {
  addNewMessage,
  getConversationMessages,
  populateMessage,
  updatedLatestMessage,
} from '../services/message.service';

export const sendMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user_id = (req as any).user.id;
    const { message, conversation_id, files } = req.body;

    if (!conversation_id && (!message || !files)) {
      logger.error('Invalid data passed into the request.');
      throw createHttpError.BadRequest();
    }

    const msgData = {
      sender: user_id,
      message,
      conversation: conversation_id,
      files: files || [],
    };

    const newMessage = await addNewMessage(msgData);

    const populateMessageSaved = await populateMessage(newMessage._id);

    await updatedLatestMessage(conversation_id, newMessage._id);

    res.status(201).json(populateMessageSaved);
  } catch (error) {
    next(error);
  }
};

export const getMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const conversation_id = req.params.conversation_id;

  if (!conversation_id) {
    logger.error('Invalid data passed into the request.');
    throw createHttpError.BadRequest();
  }

  try {
    const messages = await getConversationMessages(conversation_id);

    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};
