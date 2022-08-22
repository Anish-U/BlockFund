import { ActionTypes } from '../action-types';

export interface User {
	isLogged: boolean;
	userData: {
		email: string | null;
		firstName: string | null;
		lastName: string | null;
		ethAcc: string | null;
	};
}

interface LoginAction {
	type: ActionTypes.LOGIN;
	payload: User;
}

interface LogoutAction {
	type: ActionTypes.LOGOUT;
}

export type Action = LoginAction | LogoutAction;
