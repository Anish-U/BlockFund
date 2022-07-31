import { Request, Response } from 'express';
import { logger } from '../helpers/logger';

import Creator from '../models/Creator';

const createCreator = async (req: Request, res: Response) => {
	const { email, firstName, lastName, age, gender, password } = req.body;

	const hashedPassword = password;

	try {
		const newCreator = new Creator({
			email,
			password: hashedPassword,
			firstName,
			lastName,
			age,
			gender,
		});

		const savedCreator = await newCreator.save();
		logger.success('Creator Created Successfully');
		logger.info(savedCreator);

		res.status(200).json({ creator: savedCreator });
	} catch (err: any) {
		const error: Error = new Error('Server Error');

		logger.error(err);

		if (err.code === 11000)
			return res
				.status(500)
				.json({ message: error.message + '. Email already exists' });

		return res.status(500).json({ message: error.message });
	}
};

const getCreator = async (req: Request, res: Response) => {
	const creatorId = req.params.creatorId;

	try {
		const creator = await Creator.findById(creatorId);

		if (creator == null) {
			return res.status(403).json({ message: 'No such creator exists' });
		}

		logger.info(creator);

		res.status(200).json({ creator });
	} catch (err) {
		const error: Error = new Error('Server Error');

		logger.error(err);

		return res.status(500).json({ message: error.message });
	}
};

const deleteCreator = async (req: Request, res: Response) => {
	const creatorId = req.params.creatorId;

	try {
		const creator = await Creator.findById(creatorId);

		if (creator == null) {
			return res.status(403).json({ message: 'No such creator exists' });
		}

		logger.success('Creator Deleted Successfully');

		await creator.deleteOne();
		res.status(200).json({ message: 'Creator Deleted Successfully' });
	} catch (err) {
		const error: Error = new Error('Server Error');

		logger.error(err);

		return res.status(500).json({ message: error.message });
	}
};

export default {
	createCreator,
	getCreator,
	deleteCreator,
};
