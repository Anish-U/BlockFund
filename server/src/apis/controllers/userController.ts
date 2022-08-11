import { Request, Response } from 'express';
import { logger } from '../helpers/logger';

import User from '../models/User';

const createUser = async (req: Request, res: Response) => {
	const { email, firstName, lastName, ethAccount, gender, password } = req.body;

	const hashedPassword = password;

	try {
		const newUser = new User({
			email,
			password: hashedPassword,
			firstName,
			lastName,
			ethAccount,
			gender,
		});

		const savedUser = await newUser.save();
		logger.success('User Created Successfully');
		logger.info(savedUser);

		res.status(200).json({ user: savedUser });
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

const getUser = async (req: Request, res: Response) => {
	const userId = req.params.userId;

	try {
		const user = await User.findById(userId);

		if (user == null) {
			return res.status(403).json({ message: 'No such user exists' });
		}

		logger.info(user);

		res.status(200).json({ user });
	} catch (err) {
		const error: Error = new Error('Server Error');

		logger.error(err);

		return res.status(500).json({ message: error.message });
	}
};

const deleteUser = async (req: Request, res: Response) => {
	const userId = req.params.userId;

	try {
		const user = await User.findById(userId);

		if (user == null) {
			return res.status(403).json({ message: 'No such user exists' });
		}

		logger.success('User Deleted Successfully');

		await user.deleteOne();
		res.status(200).json({ message: 'User Deleted Successfully' });
	} catch (err) {
		const error: Error = new Error('Server Error');

		logger.error(err);

		return res.status(500).json({ message: error.message });
	}
};

export default {
	createUser,
	getUser,
	deleteUser,
};
