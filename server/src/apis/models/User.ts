import mongoose, { Schema } from 'mongoose';

export enum Gender {
	male = 'male',
	female = 'female',
	others = 'others',
}

export interface IUser extends Document {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	ethAccount: string;
	gender?: Gender;
}

const UserSchema: Schema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		ethAccount: {
			type: String,
			required: true,
		},
		gender: {
			type: Object.values(Gender),
		},
	},
	{ timestamps: true }
);

export default mongoose.model<IUser>('User', UserSchema);
