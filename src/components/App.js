import React from 'react';
import TrelloList from './TrelloList'
import { connect } from 'react-redux'
import TrelloActionButton from './TrelloActionButton'
import { DragDropContext } from 'react-beautiful-dnd'
import { sort } from '../actions'
import styled from 'styled-components'

const ListsContainer = styled.div`
  display: flex;
  flex-direction: row
`

class App extends React.Component {
  onDragEnd = (result) => {
    const { destination, source, draggableId } = result

    if (!destination) {
      return
    }

    this.props.dispatch(sort(
      source.droppableId,
      destination.droppableId,
      source.index,
      destination.index,
      draggableId
    ))
  }

  render() {
    const { lists } = this.props
    return (
      <DragDropContext onDragEnd={this.onDragEnd} >
        <ListsContainer>
          {
            lists.map(list => <TrelloList
              listID={list.id}
              key={list.id}
              title={list.title}
              cards={list.card} />)
          }
          <TrelloActionButton list />
        </ListsContainer>
      </DragDropContext>
    )
  }
}


const mapStateToProps = state => ({
  lists: state.lists
})

export default connect(mapStateToProps)(App);
