import { NextFunction, Request, Response } from 'express';
import logger from '../config/logger.config';
import createHttpError from 'http-errors';
import {
  createConversation,
  doesConversationExist,
  getUserConversation,
  populateConversation,
} from '../services/conversation.service';
import { findUser } from '../services/user.service';

export const createOpenConversation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { receiver_id } = req.body;

    const sender_id = (req as any).user.id;

    if (!receiver_id) {
      logger.error('please provide receiver_id');
      throw createHttpError.BadRequest("Something's wrong with your request");
    }

    const existed_conversation = await doesConversationExist(
      sender_id,
      receiver_id
    );

    if (existed_conversation) {
      return res.status(200).json(existed_conversation);
    }

    const receiver_user = await findUser(receiver_id);
    const conversationData = {
      name: receiver_user.name,
      picture: receiver_user.picture,
      isGroup: false,
      users: [sender_id, receiver_id],
    };

    const newConversation = await createConversation(conversationData);
    const populateConversationResult = await populateConversation(
      newConversation._id,
      'users',
      '-password'
    );
    res.status(201).json(populateConversationResult);
  } catch (error) {
    next(error);
  }
};

export const getConversation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user_id = (req as any).user.id;
    const conversation = await getUserConversation(user_id);
    res.status(200).json(conversation);
  } catch (error) {
    next(error);
  }
};
