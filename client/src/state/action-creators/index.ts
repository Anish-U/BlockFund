import { ActionTypes } from '../action-types';
import { Dispatch } from 'redux';
import { Action, User } from '../actions';

export const login = (user: User) => {
	return (dispatch: Dispatch<Action>) => {
		dispatch({
			type: ActionTypes.LOGIN,
			payload: user,
		});
	};
};

export const logout = () => {
	return (dispatch: Dispatch<Action>) => {
		dispatch({
			type: ActionTypes.LOGOUT,
		});
	};
};
