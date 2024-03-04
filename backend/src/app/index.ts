import express from 'express';
import { routes } from '../routes';
import { errorHandler } from '../middlewares/error.middleware';

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false, limit: '5mb' }));

// routes
routes(app);

// Error Handler
app.use(errorHandler);

export default app;
