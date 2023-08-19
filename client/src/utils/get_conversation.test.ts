import { User } from '../types/user.type';
import {
  getConversationId,
  getConversationName,
  getConversationPicture,
} from './get_conversation';

describe('Conversation Utils', () => {
  const user1: any = { _id: 'user1', name: 'User 1', picture: 'picture1' };
  const user2: any = { _id: 'user2', name: 'User 2', picture: 'picture2' };
  const users: User[] = [user1, user2];

  describe('getConversationId', () => {
    it('should return the other user id', () => {
      expect(getConversationId(user1, users)).toBe('user2');
      expect(getConversationId(user2, users)).toBe('user1');
    });
  });

  describe('getConversationName', () => {
    it('should return the other user name', () => {
      expect(getConversationName(user1, users)).toBe('User 2');
      expect(getConversationName(user2, users)).toBe('User 1');
    });
  });

  describe('getConversationPicture', () => {
    it('should return the other user picture', () => {
      expect(getConversationPicture(user1, users)).toBe('picture2');
      expect(getConversationPicture(user2, users)).toBe('picture1');
    });
  });
});
