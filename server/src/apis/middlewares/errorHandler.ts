import { Request, Response, NextFunction } from 'express';
import { logger } from '../helpers/logger';

const errorHandler = (req: Request, res: Response, next: NextFunction) => {
	const error: Error = new Error('Not Found');
	logger.error(error);
	return res.status(404).json({ message: error.message });
};

export default errorHandler;
