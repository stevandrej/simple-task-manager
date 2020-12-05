import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({
	component: Component,
	...rest
}) => {
	let isAuthenticated = !!useSelector(state => state.authReducer.uid);
	return (
		<Route {...rest} component={props => (
			isAuthenticated ? (
				<Component {...props} />
			) : (
					<Redirect to="/" />
				)
		)} />
	)
}