import React from 'react';
import TrelloList from './TrelloList'
import { connect } from 'react-redux'
import TrelloActionButton from './TrelloActionButton'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { sort } from '../actions'
import styled from 'styled-components'

const ListsContainer = styled.div`
  display: flex;
  flex-direction: row
`

class App extends React.Component {
  onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result

    if (!destination) {
      return
    }

    this.props.dispatch(sort(
      source.droppableId,
      destination.droppableId,
      source.index,
      destination.index,
      draggableId,
      type
    ))
  }

  render() {
    const { lists, dispatch } = this.props
    return (
      <DragDropContext onDragEnd={this.onDragEnd} >
        <Droppable droppableId="all-list" direction="horizontal" type="list">
          {provided => (
            <ListsContainer {...provided.droppableProps} ref={provided.innerRef} >
              {
                lists.map((list, index) => <TrelloList
                  listID={list.id}
                  key={list.id}
                  title={list.title}
                  cards={list.card}
                  index={index}
                  dispatch ={dispatch}
                />)
              }
              <TrelloActionButton list />
            </ListsContainer>
          )}
        </Droppable>
      </DragDropContext >
    )
  }
}


const mapStateToProps = state => ({
  lists: state.lists
})

export default connect(mapStateToProps)(App);
