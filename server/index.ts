import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import { Server } from 'socket.io';
import SocketServer from './socket.server';

import morgan from 'morgan';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import logger from './config/logger.config';
import createHttpError from 'http-errors';
import router from './routes';
import trimRequest from 'ts-trim-request';
import { connectDatabase } from './config/database.config';
import mongoose from 'mongoose';

dotenv.config();

const app = express();

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize());
app.use(cookieParser());
app.use(compression());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
app.use(trimRequest.all);
app.use(
  cors({
    origin: process.env.CLIENT_ENDPOINT,
  })
);

app.use('/api/v1', router);

app.use(async (req, res, next) => {
  next(createHttpError.NotFound('This route does not exist.'));
});

app.use(async (err: any, req: Request, res: Response, _: NextFunction) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, async () => {
  await connectDatabase();
  logger.info(`Server is running on http://localhost:${PORT}`);
  logger.info(`process id: ${process.pid}`);
});

//Socket
const io = new Server(server, {
  cors: { origin: process.env.CLIENT_ENDPOINT },
  pingTimeout: 60000,
  cookie: false,
});

io.on('connection', (socket) => {
  logger.info('Socket connected');
  SocketServer(socket, io);
});

//Error handling
const exitHandler = () => {
  if (server) {
    logger.info('Shutting closed...');
  }
  process.exit(1);
};

const unexpectedErrorHandler = (error: string) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('uncaughtRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  if (server) {
    logger.info('Shutting closed...');
    process.exit(1);
  }
});

mongoose.connection.on('error', (err) => {
  logger.error('Error in database connection: ' + err.message);
  process.exit(1);
});

if (process.env.NODE_ENV !== 'production') {
  mongoose.set('debug', true);
}
