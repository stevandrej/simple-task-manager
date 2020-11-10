import { List, ListItem } from '@material-ui/core';
import React from 'react';
import CardItem from '../Card/CardItem';

const CardsList = (props) => {

	function render() {
		return (
			props.cards ?
				props.cards.map((card, index) => <ListItem key={props.listName + index} ><CardItem card={card} itemNo={index} listName={props.listName} key={`card${index}`}/></ListItem>
				) : ''
		);
	}

	return (
		<List style={{overflowY: 'auto' , 'height': '100vh'}}>
			{render()}
		</List>
	)
}

export default CardsList;