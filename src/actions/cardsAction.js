import { CONSTANTS } from '../actions'

export const addCard = (listID, text) => {
    return {
        type: CONSTANTS.ADD_CARD,
        payload: { text, listID }
    }
}

export const deleteCard = (id, listIndex) => {
    return {
        type: CONSTANTS.DELETE_CARD,
        payload: { id, listIndex }
    }
}

export const editCard = (id, listIndex, value) => {
    return {
        type: CONSTANTS.EDIT_CARD,
        payload: {
            id,
            listIndex,
            value
        }
    }
}