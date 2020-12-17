import { database, firebase, provider } from '../../firebase/firebase';
import * as actionTypes from './actionTypes';

export const startLogin = () => {
	return () => firebase.auth().signInWithPopup(provider);
};

export const login = (uid) => {
	return {
		type: actionTypes.LOGIN,
		uid
	};
};

export const startLogout = () => {
	return async () => await firebase.auth().signOut()
		.then(() => {
			localStorage.clear();
		})
		.catch(error => {
			alert('problem with sign out: ', error)
		});
};

export const logout = () => {
	return {
		type: actionTypes.LOGOUT
	};
};

export const deleteAccount = () => {
	return {
		type: actionTypes.DELETE_ACCOUNT
	}
}

export const startDeleteAccount = () => {
	return async (dispatch, getState) => await
		database.ref(`users/${getState().authReducer.uid}`).remove()
			.then(() => firebase.auth().currentUser.delete().catch(err => { alert('Problem deleting your account ', err) }))
			.then(() => { dispatch(deleteAccount()) })
}