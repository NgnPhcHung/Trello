import React from 'react'
import TrelloCard from './TrelloCard'
import TrelloActionButton from './TrelloActionButton'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import { deleteList } from '../actions'
import { Button } from '@material-ui/core'
import Icon from '@material-ui/icons/Delete'

const ListContainer = styled.div`
    background-color: #ccc;
    border-radius: 3px;
    width: 300px;
    padding: 8px;
    height: 100%;
    margin-right: 8px
`

const TrelloList = ({ title, cards, listID, index, dispatch }) => {
    return (
        <Draggable draggableId={String(listID)} index={index}>
            {provided => (
                <ListContainer {...provided.draggableProps} ref={provided.innerRef} {...provided.dragHandleProps} >
                    <Droppable droppableId={String(listID)} >
                        {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef} >
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <h3  >{title}</h3>
                                    <Button variant="outlined" color="primary"
                                        onClick={() => {
                                            dispatch(deleteList(index))
                                        }}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <Icon />
                                    </Button>
                                </div>
                                {
                                    cards.map((card, index) =>
                                        <TrelloCard
                                            key={card.id}
                                            index={index}
                                            text={card.text}
                                            id={card.id} 
                                            dispatch = {dispatch}
                                            />
                                    )
                                }
                                <TrelloActionButton listID={listID} />
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </ListContainer>
            )}
        </Draggable>
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