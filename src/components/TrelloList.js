import React from 'react'
import TrelloCard from './TrelloCard'
import TrelloActionButton from './TrelloActionButton'
import { Droppable } from 'react-beautiful-dnd'

const TrelloList = ({ title, cards, listID }) => {
    return (
        <Droppable droppableId={String(listID)} >
            {(provided) => (
                <div { ...provided.droppableProps } ref = {provided.innerRef} style={styles.container} >
                    <h3>{title}</h3>
                    {
                        cards.map((card, index) => <TrelloCard key={card.id} index = {index} text={card.text} id = {card.id} />)
                    } 
                    <TrelloActionButton listID={listID} />
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    )
}
export default TrelloList

const styles = {
    container: {
        backgroundColor: '#ccc',
        borderRadius: 3,
        width: 300,
        padding: 8,
        height: '100%',
        marginRight: 8,
    }
}