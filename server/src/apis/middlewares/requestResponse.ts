import { Request, Response, NextFunction } from 'express';
import { logger } from '../helpers/logger';

const requestResponse = (req: Request, res: Response, next: NextFunction) => {
	logger.info(
		`Incoming Request => Method: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
	);

	res.on('finish', () => {
		logger.info(
			`Outgoing Response => Method: [${req.method}] - Status: [${res.statusCode}]`
		);
	});

	next();
};

export default requestResponse;
