import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { routes } from '../routes';
import { errorHandler } from '../middlewares/error.middleware';

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false, limit: '5mb' }));
app.use(cookieParser());

// routes
routes(app);

// Error Handler
app.use(errorHandler);

export default app;
