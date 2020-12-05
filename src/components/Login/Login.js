import { Box, Button } from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import { startLogin } from '../../redux/actions/authActions';

const Login = () => {

	const dispatch = useDispatch();

	function initiateLogin() {
		return dispatch(startLogin());
	}

	return (
		<Box style={{display:'flex', flex: 1, alignItems:'center', justifyContent:'center', minHeight:'100vh'}}>
			<Button variant="contained" color="primary" onClick={initiateLogin}>
				Log in with Google Account
			</Button>
		</Box>

	)

}

export default Login;