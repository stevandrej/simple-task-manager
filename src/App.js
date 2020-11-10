import { Container, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import CardCreator from './components/CardCreator/CardCreator';
import CardsList from './components/CardsList/CardsList';
import EditModal from './components/EditModal/EditModal';

function App() {

	const activeCardsList = useSelector(state => state.cardReducer.activeCardsList);
	const completedCardsList = useSelector(state => state.cardReducer.completedCardsList);

	return (
		<React.Fragment>
			<EditModal />
			<Container>
				<Grid container spacing={3} >
					<Grid item md sm={4} xs={12}>
						<Typography align='center' color='textPrimary' variant='button' display='block'>Add task:</Typography>
						<CardCreator />
					</Grid>
					<Grid item md sm={4} xs={12}>
						<Typography align='center' color='textPrimary' variant='h6'>Active tasks:</Typography>
						<CardsList cards={activeCardsList} listName='active' />
					</Grid>
					<Grid item md sm={4} xs={12}>
						<Typography align='center' color='textPrimary' variant='h6'>Completed tasks:</Typography>
						<CardsList cards={completedCardsList} listName='completed' />
					</Grid>
				</Grid>
			</Container>
		</React.Fragment>
	);
}

export default App;