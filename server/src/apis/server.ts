// Importing npm modules
import express, { Application, Request, Response, NextFunction } from 'express';

// Importing local modules
import { logger } from './helpers/logger';
import { config } from '../configs/config';
import initDB from '../configs/database';

// Importing middlewares
import requestResponse from './middlewares/requestResponse';
import errorHandler from './middlewares/errorHandler';
import apiRules from './middlewares/apiRules';

// Importing routes
import userRouter from './routes/userRouter';

// Express application
const app: Application = express();

// Middleware to parse incoming requests with JSON payload
app.use(express.json());

// Middleware to parse incoming requests with urlencoded payload
app.use(express.urlencoded({ extended: true }));

// Middleware for request-response logging
app.use(requestResponse);

// Middleware for API rules
app.use(apiRules);

// Routes
app.use('/user', userRouter);

// HealthCheck Route
app.get('/ping', (req: Request, res: Response, next: NextFunction) => {
	logger.success('Server Working Properly');
	return res.status(200).json({ message: 'pong' });
});

// Error Handling Route
app.use(errorHandler);

// Serving and listening at Server Port
app.listen(config.server.port, () => {
	logger.success(`Backend server running at localhost:${config.server.port}`);
	initDB();
});
