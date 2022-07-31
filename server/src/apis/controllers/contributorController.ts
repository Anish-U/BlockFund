import { Request, Response } from 'express';
import { logger } from '../helpers/logger';

import Contributor from '../models/Contributor';

const createContributor = async (req: Request, res: Response) => {
	const { email, firstName, lastName, age, gender, password } = req.body;

	const hashedPassword = password;

	try {
		const newContributor = new Contributor({
			email,
			password: hashedPassword,
			firstName,
			lastName,
			age,
			gender,
		});

		const savedContributor = await newContributor.save();
		logger.success('Contributor Created Successfully');
		logger.info(savedContributor);

		res.status(200).json({ contributor: savedContributor });
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

const getContributor = async (req: Request, res: Response) => {
	const contributorId = req.params.contributorId;

	try {
		const contributor = await Contributor.findById(contributorId);

		if (contributor == null) {
			return res.status(403).json({ message: 'No such contributor exists' });
		}

		logger.info(contributor);

		res.status(200).json({ contributor });
	} catch (err) {
		const error: Error = new Error('Server Error');

		logger.error(err);

		return res.status(500).json({ message: error.message });
	}
};

const deleteContributor = async (req: Request, res: Response) => {
	const contributorId = req.params.contributorId;

	try {
		const contributor = await Contributor.findById(contributorId);

		if (contributor == null) {
			return res.status(403).json({ message: 'No such contributor exists' });
		}

		logger.success('Contributor Deleted Successfully');

		await contributor.deleteOne();
		res.status(200).json({ message: 'Contributor Deleted Successfully' });
	} catch (err) {
		const error: Error = new Error('Server Error');

		logger.error(err);

		return res.status(500).json({ message: error.message });
	}
};

export default {
	createContributor,
	getContributor,
	deleteContributor,
};
