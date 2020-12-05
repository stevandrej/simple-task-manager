import * as actionTypes from '../actions/actionTypes';

const initState = {
	isLoading: true,
	activeCardsList: [],
	completedCardsList: [],
	openModal: false,
	activeCard: { index: '', listName: '', id: '' }
}

const cardReducer = (state = initState, action) => {
	switch (action.type) {
		//NEW CARD
		case actionTypes.ADD_CARD:
			return {
				...state,
				activeCardsList: [...state.activeCardsList,
				{
					id: action.payload.id,
					title: action.payload.title,
					content: action.payload.content,
					status: 'active'
				}
				]
			}
		//SET CARDS
		case actionTypes.SET_CARDS:
			return {
				...state,
				isLoading: false,
				activeCardsList: action.payload.activeCardsList,
				completedCardsList: action.payload.completedCardsList
			}
		//OPEN MODAL
		case actionTypes.TOGGLE_MODAL:
			return {
				...state,
				openModal: !state.openModal
			}
		//CARD IN FOCUS (ACTIVE CARD)
		case actionTypes.ACTIVE_CARD:
			return {
				...state,
				activeCard: {
					...state.activeCard,
					index: action.payload.index,
					listName: action.payload.listName,
					id: action.payload.id
				}
			}
		//COMPLETED BUTTON
		case actionTypes.COMPLETED_BUTTON:
			const updatedItemCompleted = {
				...action.payload.card,
				id: action.payload.id
			}
			return {
				...state,
				completedCardsList: [
					...state.completedCardsList,
					updatedItemCompleted
				],
				activeCardsList: [...state.activeCardsList.filter(item => item.id !== action.payload.oldID)]
			}
		//UNDO BUTTON
		case actionTypes.UNDO_COMPLETED_BUTTON:
			const updatedItemUndo = {
				...action.payload.card,
				id: action.payload.id
			}
			return {
				...state,
				activeCardsList: [
					...state.activeCardsList,
					updatedItemUndo
				],
				completedCardsList: [...state.completedCardsList.filter(item => item.id !== action.payload.oldID)]
			}

		//EDIT BUTTON - OPEN MODAL SETs CARD IN FOCUS / ACTIVE CARD
		case actionTypes.EDIT_BUTTON:
			return {
				...state,
				activeCard: action.payload,
				openModal: !state.openModal
			}

		//UPDATE BUTTON
		case actionTypes.UPDATE_BUTTON:
			if (action.payload.status === 'active')
				return {
					...state,
					activeCardsList: state.activeCardsList.map((card, index) => {
						if (index === action.payload.index) {
							return {
								...card,
								title: action.payload.title,
								content: action.payload.content
							}
						}
						return card;
					})
				}
			else if (action.payload.status === 'completed')
				return {
					...state,
					completedCardsList: state.completedCardsList.map((card, index) => {
						if (index === action.payload.index) {
							return {
								...card,
								title: action.payload.title,
								content: action.payload.content
							}
						}
						return card;
					})
				}
			else
				return {
					...state
				}
		//DELETE BUTTON
		case actionTypes.DELETE_BUTTON:
			if (action.payload.listName === 'active' && state.activeCardsList.length > -1) {
				return {
					...state,
					activeCardsList: state.activeCardsList.filter((item) => item.id !== action.payload.id)
				}
			}
			else if (action.payload.listName === 'completed' && state.completedCardsList.length > -1) {
				return {
					...state,
					completedCardsList: state.completedCardsList.filter((item) => item.id !== action.payload.id)
				}
			}
			else return state;
		default:
			return state;
	}
}

export default cardReducer;