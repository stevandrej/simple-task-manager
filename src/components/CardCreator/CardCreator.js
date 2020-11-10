import { Button, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCard } from '../../redux/actions/cardActions';

const CardCreator = () => {

	const dispatch = useDispatch();
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');

	const handleChangeTitle = (event) => {
		setTitle(event.target.value)
	}

	const handleChangeContent = (event) => {
		setContent(event.target.value)
	}

	const handleAddCard = () => {
		if (title || content) {
			dispatch(addCard({ title, content }))
			setTitle('');
			setContent('')
		}
	}

	return (
		<React.Fragment>
			<div>
				<TextField id='standard-basic' label='Title' margin='normal' value={title} onChange={handleChangeTitle} />
			</div>
			<div>
				<TextField
					id="outlined-multiline-static"
					label="Content"
					multiline
					rows={4}
					fullWidth
					value={content}
					variant="outlined"
					margin='normal'
					onChange={handleChangeContent}
				/>
			</div>
			<div>
				<Button variant="contained" color="secondary" onClick={handleAddCard}>Add +</Button>
			</div>
		</React.Fragment >
	)
}

export default CardCreator;