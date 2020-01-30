import React from 'react'
import TrelloCard from './TrelloCard'
import TrelloActionButton from './TrelloActionButton'
import { Droppable } from 'react-beautiful-dnd'
import styled from 'styled-components'

const ListContainer = styled.div`
    background-color: #ccc;
    border-radius: 3px;
    width: 300px;
    padding: 8px;
    height: 100%;
    margin-right: 8px
`

const TrelloList = ({ title, cards, listID }) => {
    return (
        <Droppable droppableId={String(listID)} >
            {(provided) => (
                <ListContainer {...provided.droppableProps} ref={provided.innerRef} >

                    <h3>{title}</h3>
                    {
                        cards.map((card, index) => <TrelloCard key={card.id} index={index} text={card.text} id={card.id} />)
                    }
                    <TrelloActionButton listID={listID} />
                    {provided.placeholder}
                </ListContainer>
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