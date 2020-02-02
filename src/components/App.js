import React from 'react';
import TrelloList from './TrelloList'
import { connect } from 'react-redux'
import TrelloActionButton from './TrelloActionButton'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { sort } from '../actions'
import styled from 'styled-components'
import './App.css'

const ListsContainer = styled.div`
  display: flex;
  flex-direction: row
`

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      isDrag: false
    }
  }

  onDragStart = () => {
    this.setState({
      isDrag: true
    })
  }

  onDragEnd = (result) => {

    this.setState({
      isDrag: false
    })

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
      <DragDropContext onDragEnd={this.onDragEnd} onDragStart={this.state.isDrag} >
        <Droppable droppableId="all-list" direction="horizontal" type="list">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className = {this.state.isDrag ? "listRotate": "listContainer"}
            >
              {
                lists.map((list, index) => <TrelloList
                  listID={list.id}
                  key={list.id}
                  title={list.title}
                  cards={list.card}
                  index={index}
                  dispatch={dispatch}
                />)
              }
              <TrelloActionButton list />
            </div>
          )}
        </Droppable>
      </DragDropContext >
    )
  }
}

// const styles = {
//   listContainer: {
//     display: "flex",
//     flexDirection: "row"
//   }
// }

const mapStateToProps = state => ({
  lists: state.lists
})

export default connect(mapStateToProps)(App);
