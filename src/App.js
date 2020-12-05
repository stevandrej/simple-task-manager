import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { firebase } from './firebase/firebase';
import Dashboard from './components/DashBoard/Dashboard';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import Login from './components/Login/Login';
import { useDispatch } from 'react-redux';
import { login, logout } from './redux/actions/authActions';
import { history } from './index';
import { PrivateRoute } from './router/PrivateRoute';
import { PublicRoute } from './router/PublicRoute';

function App() {

	const dispatch = useDispatch();

	firebase.auth().onAuthStateChanged((user) => {
		if (user) {
			dispatch(login(user.uid));
			if (history.location.pathname === '/') {
				history.push('/dashboard');
			}
		}
		else {
			dispatch(logout());
			history.push('/');
		}
	});

	return (
		<Switch>
			<PublicRoute path={['/', '/simple-task-manager']} exact component={Login} />
			<PrivateRoute path='/dashboard' component={Dashboard} />
			<Route component={NotFoundPage} />
		</Switch>
	);
}

export default App;