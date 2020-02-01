import React from 'react'
import TrelloCard from './TrelloCard'
import TrelloActionButton from './TrelloActionButton'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import { deleteList, editList } from '../actions'
import { IconButton } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import CreateTwoToneIcon from '@material-ui/icons/CreateTwoTone'
import Textarea from 'react-textarea-autosize';

const ListContainer = styled.div`
    background-color: #ccc;
    border-radius: 3px;
    width: 300px;
    padding: 8px;
    height: 100%;
    left: 4px;
    position: relative;
    margin-left: 10px
`

class TrelloList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isEdit: false,
            text: this.props.title
        }
    }

    editList = () => {
        // const { dispatch, index } = this.props
        // dispatch(editList(e,index))
        // this.setState({
        //     isEdit:false
        // })
        console.log(this.state.text)
    }

    handleInputChange = e => {
        this.setState({
            text: e.target.value
        })
    }

    render() {
        const { title, cards, listID, index, dispatch } = this.props
        return (
            <Draggable draggableId={String(listID)} index={index}>
                {provided => (
                    <ListContainer {...provided.draggableProps} ref={provided.innerRef} {...provided.dragHandleProps} >
                        <Droppable droppableId={String(listID)} >
                            {(provided) => (
                                <div {...provided.droppableProps} ref={provided.innerRef} >
                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                        {
                                            this.state.isEdit ?
                                                <Textarea value={this.state.text}
                                                    onChange={this.handleInputChange}
                                                    style={{
                                                        resize: "none",
                                                        width: '100%',
                                                        overflow: 'hidden',
                                                        outline: 'none',
                                                        border: 'none',
                                                        borderRadius:5,
                                                        padding:10,
                                                        fontSize:12
                                                    }}
                                                />
                                                :
                                                <h3  >{title}</h3>
                                        }
                                        <div style={{ position: 'absolute' ,display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginLeft: 230 }} >
                                            <IconButton variant="outlined" color="primary" size="small"
                                                onClick={(index) => {
                                                    this.setState({
                                                        isEdit: !this.state.isEdit
                                                    })
                                                    dispatch(editList(this.state.text, this.props.index))
                                                }}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <CreateTwoToneIcon fontSize="small" />
                                            </IconButton>
                                            <IconButton variant="outlined" color="primary"
                                                onClick={() => {
                                                    dispatch(deleteList(index))
                                                }}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </div>
                                    </div>
                                    {
                                        cards.map((card, i) =>
                                            <TrelloCard
                                                key={card.id}
                                                index={i}
                                                listIndex={index}
                                                text={card.text}
                                                id={card.id}
                                                dispatch={dispatch}
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
}
export default TrelloList

