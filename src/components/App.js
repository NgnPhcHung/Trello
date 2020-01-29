import React from 'react';
import TrelloList from './TrelloList'
import { connect } from 'react-redux'
import TrelloActionButton from './TrelloActionButton'
import { DragDropContext } from 'react-beautiful-dnd'

class App extends React.Component {
  onDragEnd = () => {

  }

  render() {
    const { lists } = this.props
    return (
      <DragDropContext onDragEnd = {this.onDragEnd} >
        <div style={styles.listsContainer} >
          {
            lists.map(list => <TrelloList
              listID={list.id}
              key={list.id}
              title={list.title}
              cards={list.card} />)
          }
          <TrelloActionButton lists />
        </div>
      </DragDropContext>
    )
  }
}

const styles = {
  listsContainer: {
    display: 'flex',
    flexDirection: 'row'
  }
}

const mapStateToProps = state => ({
  lists: state.lists
})

export default connect(mapStateToProps)(App);
