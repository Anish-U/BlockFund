import { Action, User } from '../actions';
import { ActionTypes } from '../action-types';

const initialState = {
	isLogged: localStorage.getItem('token') ? true : false,
	userData: localStorage.getItem('token')
		? {
				email: localStorage.getItem('email'),
				firstName: localStorage.getItem('firstName'),
				lastName: localStorage.getItem('lastName'),
				ethAcc: localStorage.getItem('ethAcc'),
		  }
		: {
				email: null,
				firstName: null,
				lastName: null,
				ethAcc: null,
		  },
};

const logoutState = {
	isLogged: false,
	userData: {
		email: null,
		firstName: null,
		lastName: null,
		ethAcc: null,
	},
};

const reducer = (state: User = initialState, action: Action) => {
	switch (action.type) {
		case ActionTypes.LOGIN:
			return action.payload;
		case ActionTypes.LOGOUT:
			return logoutState;
		default:
			return state;
	}
};

export default reducer;
