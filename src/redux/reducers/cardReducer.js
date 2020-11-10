import * as actionTypes from '../actions/actionTypes';

const initState = {
	activeCardsList: [],
	completedCardsList: [],
	openModal: false,
	activeCard: { index: '', listName: '' }
}

const cardReducer = (state = initState, action) => {
	switch (action.type) {
		case actionTypes.ADD_CARD:
			return {
				...state,
				activeCardsList: [...state.activeCardsList,
				{
					title: action.payload.title,
					content: action.payload.content,
					status: 'active'
				}
				]
			}
		case actionTypes.TOGGLE_MODAL:
			return {
				...state,
				openModal: !state.openModal
			}
		case actionTypes.ACTIVE_CARD:
			return {
				...state,
				activeCard: {
					...state.activeCard,
					index: action.payload.index,
					listName: action.payload.listName
				}
			}

		case actionTypes.COMPLETED_BUTTON:
			return {
				...state,
				completedCardsList: [
					...state.completedCardsList,
					state.activeCardsList[action.payload.index]
				],
				activeCardsList: [
					...state.activeCardsList.slice(0, action.payload.index),
					...state.activeCardsList.slice(action.payload.index + 1)
				]
			}
		case actionTypes.UNDO_COMPLETED_BUTTON:
			return {
				...state,
				activeCardsList: [
					...state.activeCardsList,
					state.completedCardsList[action.payload.index]
				],
				completedCardsList: [
					...state.completedCardsList.slice(0, action.payload.index),
					...state.completedCardsList.slice(action.payload.index + 1)
				]
			}
		case actionTypes.EDIT_BUTTON:
			return {
				...state,
				activeCard: action.payload,
				openModal: !state.openModal
			}
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
		case actionTypes.DELETE_BUTTON:
			if (action.payload.listName === 'active' && state.activeCardsList.length > -1) {
				return {
					...state,
					activeCardsList: [
						...state.activeCardsList.slice(0, action.payload.index),
						...state.activeCardsList.slice(action.payload.index + 1)
					]
				}
			}
			else if (action.payload.listName === 'completed' && state.completedCardsList.length > -1) {
				return {
					...state,
					completedCardsList: [
						...state.completedCardsList.slice(0, action.payload.index),
						...state.completedCardsList.slice(action.payload.index + 1)
					]
				}
			}
			else return state;
		default:
			return state;
	}
}

export default cardReducer;