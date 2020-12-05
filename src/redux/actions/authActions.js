import { firebase, provider } from '../../firebase/firebase';
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
	return async () => await firebase.auth().signOut().then( console.log('sigh-out successfull') ).catch( error => { alert( 'problem with sign out: ', error)});
};

export const logout = () => {
	return {
		type: actionTypes.LOGOUT
	};
};