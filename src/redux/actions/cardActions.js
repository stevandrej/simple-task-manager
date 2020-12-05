import * as actionTypes from './actionTypes';
import { database } from '../../firebase/firebase';


//GET CARDS FROM DB
export const setCards = (active = [], completed = []) => {
    return {
        type: actionTypes.SET_CARDS,
        payload: {
            activeCardsList: active,
            completedCardsList: completed
        }
    }
}

export const startSetCards = () => {
    return async (dispatch, getState) => {
        if (!!getState().authReducer.uid) {
            const uid = getState().authReducer.uid;
            const activeCards = await database.ref(`users/${uid}/active`).once('value').then(snapshot => {
                const activeCardsList = [];

                snapshot.forEach(childSnapshot => {
                    activeCardsList.push({
                        id: childSnapshot.key,
                        ...childSnapshot.val()
                    });
                });
                return (activeCardsList);
            });

            const completedCards = await database.ref(`users/${uid}/completed`).once('value').then(snapshot => {
                const completedCardsList = [];

                snapshot.forEach(childSnapshot => {
                    completedCardsList.push({
                        id: childSnapshot.key,
                        ...childSnapshot.val()
                    });
                });

                return (completedCardsList);
            });
            dispatch(setCards(activeCards, completedCards));
        }
    }
}

//ADD CARD
export const addCard = (payload) => {
    return {
        type: actionTypes.ADD_CARD,
        payload: payload
    }
}

export const startAddCard = (payloadData = {}) => {
    return (dispatch, getState) => {
        const uid = getState().authReducer.uid;
        let payload = {
            title: payloadData.title,
            content: payloadData.content,
            status: 'active'
        };

        return database.ref(`users/${uid}/active`).push(payload).then((ref) => {
            payload = {
                ...payload,
                id: ref.key
            }
        }).then(() => {
            dispatch(addCard(payload))
        })
    }
}

//TOGGLE MODAL
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

//SET COMPLETED CARD
export const completedButton = (payload) => {
    return {
        type: actionTypes.COMPLETED_BUTTON,
        payload: payload
    }
}

export const startCompletedButton = (payload) => {
    return async (dispatch, getState) => {

        const uid = getState().authReducer.uid;

        //In 'updatedPayload' different from 'payload' is the 'status' and later the new key/ID from the DB is used. 

        //change status to completed
        let updatedPayload = {
            ...payload,
            card: {
                ...payload.card,
                status: 'completed'
            }
        }
        await database.ref(`users/${uid}/completed`).push(updatedPayload.card)
            .then((ref) => {
                //set the new ID from firebase
                updatedPayload = {
                    ...updatedPayload,
                    oldID: updatedPayload.id,
                    id: ref.key
                }
            })
            .then(() => {
                database.ref(`users/${uid}/active/${payload.id}`).remove().catch(err => {
                    alert('Remove from DB failed: ', err)
                })
            }).then(() => {
                dispatch(completedButton(updatedPayload))
            })
            .catch(err => {
                alert('something went wrong with removing from DB: ', err)
            })
    }
}

//SET UNDO COMPLETED CARD
export const undoCompletedButton = (payload) => {
    return {
        type: actionTypes.UNDO_COMPLETED_BUTTON,
        payload: payload
    }
}

export const startUndoCompletedButton = (payload) => {
    return async (dispatch, getState) => {

        const uid = getState().authReducer.uid;

        //change status to active
        let updatedPayload = {
            ...payload,
            card: {
                ...payload.card,
                status: 'active'
            }
        }
        await database.ref(`users/${uid}/active`).push(updatedPayload.card)
            .then((ref) => {
                updatedPayload = {
                    ...updatedPayload,
                    oldID: updatedPayload.id,
                    id: ref.key
                }
            })
            .then(() => {
                database.ref(`users/${uid}/completed/${payload.id}`).remove().catch(err => {
                    alert('Remove from DB failed: ', err)
                })
            }).then(() => {
                dispatch(undoCompletedButton(updatedPayload))
            })
            .catch(err => {
                alert('something went from with DB: ', err)
            })
    }
}

//OPENS MODAL
export const editButton = (payload) => {
    return {
        type: actionTypes.EDIT_BUTTON,
        payload: payload
    }
}

//EDIT CARD | UPDATE CARD
export const updateButton = (payload) => {
    return {
        type: actionTypes.UPDATE_BUTTON,
        payload: payload
    }
}

export const startUpdateButton = (payload) => {
    return async (dispatch, getState) => {
        const uid = getState().authReducer.uid;
        await database.ref(`users/${uid}/${payload.status}/${payload.id}`).update({ title: payload.title, content: payload.content })
            .then(() => {
                dispatch(updateButton(payload));
            })
            .catch(err => { alert('Error updating the card ', err) });
    }
}

//DELETE CARD
export const deleteButton = (payload) => {
    return {
        type: actionTypes.DELETE_BUTTON,
        payload: payload
    }
}

export const startDeleteButton = (payload) => {
    return async (dispatch, getState) => {
        const uid = getState().authReducer.uid;
        if (payload.listName === 'active') {
            await database.ref(`users/${uid}/active/${payload.id}`).remove().then(() => {
                dispatch(deleteButton(payload));
            })
        }
        else if (payload.listName === 'completed') {
            await database.ref(`users/${uid}/completed/${payload.id}`).remove().then(() => {
                dispatch(deleteButton(payload));
            })
        }
    }
}