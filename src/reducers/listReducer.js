import { CONSTANTS } from '../actions'
let listID = 2
let cardID = 6
const initialState = [
    {
        title: "Last Episode",
        id: `list-${0}`,
        card: [
            {
                id: `card-${0}`,
                text: "ahihi ahehe"
            },
            {
                id: `card-${1}`,
                text: "we use mix between material UI React"
            },
        ]
    },
    {
        title: "This Episode",
        id: `list-${1}`,
        card: [
            {
                id: `card-${2}`,
                text: "create reudcers"
            },
            {
                id: `card-${3}`,
                text: "render any card"
            },
            {
                id: `card-${4}`,
                text: "make little change"
            },
        ]
    }
]

const listReducer = (state = initialState, action) => {
    switch (action.type) {
        case CONSTANTS.ADD_LIST:
            const newList = {
                title: action.payload,
                card: [],
                id: `list-${listID}`
            }
            listID += 1
            return [...state, newList]
        case CONSTANTS.ADD_CARD:
            const newCard = {
                text: action.payload.text,
                id: `card-${cardID}`
            }
            cardID += 1;

            console.log("reveved", action)

            const newState = state.map(list => {
                if (list.id === action.payload.listID) {
                    return {
                        ...list,
                        card: [...list.card, newCard]
                    }
                }else {
                    return list
                }
            })
            return newState
        default:
            return state
    }
}

export default listReducer