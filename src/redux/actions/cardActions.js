import * as actionTypes from './actionTypes';

export const addCard = (payload) => {
    return {
        type: actionTypes.ADD_CARD,
        payload: payload
    }
}

export const toggleModal = () => {
    return {
        type: actionTypes.TOGGLE_MODAL
    }
}

export const setActiveCard = (payload) => {
    return {
        type: actionTypes.ACTIVE_CARD,
        payload: payload
    }
}

export const completedButton = (payload) => {
    return {
        type: actionTypes.COMPLETED_BUTTON,
        payload: payload
    }
}

export const undoCompletedButton = (payload) => {
    return {
        type: actionTypes.UNDO_COMPLETED_BUTTON,
        payload: payload
    }
}

export const editButton = (payload) => {
    return {
        type: actionTypes.EDIT_BUTTON,
        payload: payload
    }
}

export const updateButton = (payload) => {
    return {
        type: actionTypes.UPDATE_BUTTON,
        payload: payload
    }
}

export const deleteButton = (payload) => {
    return {
        type: actionTypes.DELETE_BUTTON,
        payload: payload
    }
}