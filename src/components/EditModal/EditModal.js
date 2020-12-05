import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Backdrop, TextField, Dialog, DialogContent, DialogTitle, DialogActions, Button } from '@material-ui/core';
import { toggleModal, setActiveCard, startUpdateButton } from '../../redux/actions/cardActions';

const EditModal = () => {

	const openModal = useSelector(state => state.cardReducer.openModal);
	const activeCard = useSelector(state => state.cardReducer.activeCard);

	const whatList = (state) => {
		if (activeCard.listName === 'active')
			return state.cardReducer.activeCardsList[activeCard.index]
		else if (activeCard.listName === 'completed')
			return state.cardReducer.completedCardsList[activeCard.index]
		else return null;
	}
	
	let theCardElementFromTheArray = useSelector(state => whatList(state));

	const [updatedTitle, setUpdatedTitle] = useState('');
	const [updatedContent, setUpdatedContent] = useState('');

	const dispatch = useDispatch()

	const handleCloseModal = () => {
		dispatch(toggleModal());
		dispatch(setActiveCard(''));
	};

	const handleUpdate = () => {

		dispatch(startUpdateButton({
			id: activeCard.id,
			index: activeCard.index,
			status: activeCard.listName,
			title: updatedTitle,
			content: updatedContent
		}))

		setUpdatedTitle('');
		setUpdatedContent('');

		handleCloseModal();
	}

	useEffect(() => {
		if (theCardElementFromTheArray) {
			setUpdatedTitle(theCardElementFromTheArray.title);
			setUpdatedContent(theCardElementFromTheArray.content);
		}
		else {
			setUpdatedTitle('');
			setUpdatedContent('');
		}
	},[theCardElementFromTheArray])


	return (
		<Dialog
			open={openModal}
			onClose={handleCloseModal}
			aria-labelledby="transition-modal-title"
			aria-describedby="transition-modal-description"
			closeAfterTransition
			BackdropComponent={Backdrop}
			BackdropProps={{ timeout: 500, }}
		>
			<DialogTitle id="form-dialog-title">Edit Note</DialogTitle>
			<DialogContent>
				<div>
					<TextField id='standard-basic' label='Title' margin='normal' value={updatedTitle} onChange={event => { setUpdatedTitle(event.target.value) }} />
				</div>
				<div>
					<TextField
						id="outlined-multiline-static"
						label="Content"
						multiline
						rows={4}
						value={updatedContent}
						variant="outlined"
						margin='normal'
						onChange={event => { setUpdatedContent(event.target.value) }}
					/>
				</div>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleUpdate} color="primary" >Update</Button>
				<Button onClick={handleCloseModal} color="primary">Close</Button>
			</DialogActions>
		</Dialog>
	)
}

export default EditModal