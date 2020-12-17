import React, { useEffect } from 'react';
import { startSetCards } from '../../redux/actions/cardActions';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, CircularProgress, Container, Grid, Typography } from '@material-ui/core';
import EditModal from '../EditModal/EditModal';
import CardCreator from '../CardCreator/CardCreator';
import CardsList from '../CardsList/CardsList';
import { logout, startDeleteAccount, startLogout } from '../../redux/actions/authActions';


const Dashboard = () => {

	const activeCardsList = useSelector(state => state.cardReducer.activeCardsList);
	const completedCardsList = useSelector(state => state.cardReducer.completedCardsList);
	const isLoading = useSelector(state => state.cardReducer.isLoading);
	const dispatch = useDispatch();


	useEffect(() => {
		dispatch(startSetCards());
	}, [dispatch])

	function initiateLogout() {
		dispatch(startLogout())
		dispatch(logout())
	}

	function initiateDeleteUser() {
		dispatch(startDeleteAccount());
	}

	return (
		<React.Fragment>
			<EditModal />
			<Box style={{padding: '10px 20px', display:'flex', justifyContent: 'flex-end'}}>
				<Button variant="contained" color="primary" onClick={initiateLogout} >Log out</Button>
			</Box>
			<Box style={{padding: '10px 20px', display:'flex', justifyContent: 'flex-end'}}>
				<Button variant="contained" color="primary" onClick={initiateDeleteUser} >Delete account</Button>
			</Box>
			<Container>
				<Grid container spacing={3} >
					<Grid item md sm={4} xs={12}>
						<Typography align='center' color='textPrimary' variant='button' display='block'>Add task:</Typography>
						<CardCreator />
					</Grid>
					<Grid item md sm={4} xs={12}>
						<Typography align='center' color='textPrimary' variant='h6'>Active tasks:</Typography>
						{isLoading ? <CircularProgress /> : <CardsList cards={activeCardsList} listName='active' />}
					</Grid>
					<Grid item md sm={4} xs={12}>
						<Typography align='center' color='textPrimary' variant='h6'>Completed tasks:</Typography>
						{isLoading ? <CircularProgress color="secondary" /> : <CardsList cards={completedCardsList} listName='completed' />}
					</Grid>
				</Grid>
			</Container>
		</React.Fragment>
	)
}

export default Dashboard;