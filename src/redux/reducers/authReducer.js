import * as actionTypes from '../actions/actionTypes';

const authReducer = (state = {}, action) => {
	switch (action.type) {
		case actionTypes.LOGIN:
			return {
				uid: action.uid
			};
		case actionTypes.LOGOUT:
			return {};
		case actionTypes.DELETE_ACCOUNT:
			return {};
		default:
			return state
	}
};

export default authReducer;