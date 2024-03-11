import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { routes } from '../routes';
import * as errorMiddlewaare from '../middlewares/error.middleware';

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false, limit: '5mb' }));
app.use(cookieParser());

// routes
routes(app);

// Error Handler
app.use(errorMiddlewaare.errorEndPointNotFound);
app.use(errorMiddlewaare.errorHandler);

export default app;
