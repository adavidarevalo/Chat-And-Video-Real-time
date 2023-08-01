import mongoose from 'mongoose';
import logger from './logger.config';

export const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI ?? "", {
      dbName: 'whatsapp',
    });
    logger.info('Connected to MongoDB');
  } catch (error) {
    logger.error(error);
  }
};