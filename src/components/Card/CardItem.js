import { Card, CardContent, IconButton, Typography, CardActions } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import UndoIcon from '@material-ui/icons/Undo';
import React from 'react';
import { useDispatch } from 'react-redux';
import { startCompletedButton, startDeleteButton, editButton, startUndoCompletedButton } from '../../redux/actions/cardActions';

const CardItem = (props) => {

	const dispatch = useDispatch()

	const handleCompletedButton = () => {
		dispatch(startCompletedButton({
			listName: props.listName,
			index: props.itemNo,
			id: props.id,
			card: props.card
		}))
	}

	const handleUndoCompleted = () => {
		dispatch(startUndoCompletedButton({
			listName: props.listName,
			index: props.itemNo,
			id: props.id,
			card: props.card
		}))
	}

	const handleEditButton = () => {
		dispatch(editButton({
			index: props.itemNo,
			listName: props.listName,
			id: props.id
		})
		);
	}

	const handleDeleteButton = () => {
		dispatch(startDeleteButton({
			listName: props.listName,
			index: props.itemNo,
			id: props.id
		})
		)
	}

	return (
		<Card style={{flexGrow: 1}}>
			<CardContent>
				{/* TITLE */}
				<Typography variant="h5" component="h2">
					{props.card.title}
				</Typography>

				{/* CONTENT */}
				<Typography variant="body2" component="p" style={{whiteSpace: 'pre-line'}}>
					{props.card.content}
				</Typography>
			</CardContent>

			{/* BUTTONS */}
			<CardActions disableSpacing style={{justifyContent:"flex-end"}}>
				{
					props.listName === 'active' ?

						<IconButton aria-label="completed" onClick={handleCompletedButton}>
							<CheckCircleIcon />
						</IconButton>

						:

						<IconButton aria-label="completed" onClick={handleUndoCompleted}>
							<UndoIcon />
						</IconButton>
				}


				<IconButton aria-label="edit" onClick={handleEditButton}>
					<CreateIcon />
				</IconButton>

				<IconButton aria-label="delete" onClick={handleDeleteButton} >
					<DeleteIcon />
				</IconButton>
			</CardActions>
		</Card>
	)
}

export default CardItem;