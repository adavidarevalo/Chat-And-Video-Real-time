import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import logger from "./config/logger.config"

dotenv.config();

const app = express();

if (process.env.NODE_ENV !== 'production') {
    app.use(morgan("dev"))
}

app.use(helmet())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize())
app.use(cookieParser())
app.use(compression())
app.use(fileUpload({
    useTempFiles: true,
}))
app.use(cors({
    origin: 'http://localhost:3000'
}))

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, Express with TypeScript!');
});

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
    logger.info(`Server is running on http://localhost:${PORT}`);
    logger.info(`process id: ${process.pid}`);
});

const exitHandler = () => {
    if (server) {
        logger.info('Shutting closed...');
    }
    process.exit(1)
}

const unexpectedErrorHandler = (error: string) => {
    logger.error(error);
    exitHandler()
}

process.on("uncaughtException", unexpectedErrorHandler);
process.on("uncaughtRejection", unexpectedErrorHandler);