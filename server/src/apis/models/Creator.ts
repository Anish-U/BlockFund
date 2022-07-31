import mongoose, { Schema } from 'mongoose';

export enum Gender {
	male = 'male',
	female = 'female',
	other = 'other',
}

export interface ICreator extends Document {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	age: number;
	gender?: Gender;
}

const CreatorSchema: Schema = new mongoose.Schema(
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
		age: {
			type: Number,
			required: true,
		},
		gender: {
			type: Object.values(Gender),
		},
	},
	{ timestamps: true }
);

export default mongoose.model<ICreator>('Creator', CreatorSchema);
