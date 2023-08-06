import createHttpError from 'http-errors';
import { Conversation } from '../models';
import { User } from '../models/user.model';

export const doesConversationExist = async (
  sender_id: string,
  receiver_id: string
) => {
  let conversation: any = await Conversation.findOne({
    isGroup: false,
    $adn: [
      { users: { $elemMatch: { $eq: sender_id } } },
      { users: { $elemMatch: { $eq: receiver_id } } },
    ],
  })
    .populate('users', '-password')
    .populate('latestMessage');

  if (!conversation) {
    throw createHttpError.BadRequest('Something went wrong!');
  }

  conversation = await User.populate(conversation, {
    path: 'latestMessage.sender',
    select: 'name email picture status',
  });

  return conversation[0];
};

export const createConversation = async (conversationData: any) => {
  const newConversation = await (
    await Conversation.create(conversationData)
  ).save();
  if (!newConversation) {
    throw createHttpError.BadRequest('Something went wrong!');
  }

  return newConversation;
};

export const populateConversation = async (
  id: string,
  fieldToPopulate: string,
  fieldsToRemove: string
) => {
  const populateConversationResult = await Conversation.findById(id).populate(
    fieldToPopulate,
    fieldsToRemove
  );

  if (!populateConversationResult) {
    throw createHttpError.BadRequest('Something went wrong!');
  }

  return populateConversationResult;
};

export const getUserConversation = async (user_id: string) => {
  let conversations;
  await Conversation.find({
    users: { $elemMatch: { $eq: user_id } },
  })
    .populate('users', '-password')
    .populate('admin', '-password')
    .populate('latestMessage')
    .sort({ createdAt: -1 })
    .then(async (results) => {
      const r = await User.populate(results, {
        path: 'latestMessage.sender',
        select: 'name email picture status',
      });
      conversations = r;
    })
    .catch(() => {
      throw createHttpError.BadRequest('Something went wrong!');
    });

  return conversations;
};
