import React from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import { deleteCard, editCard } from '../actions'
import DeleteOutlined from '@material-ui/icons/DeleteOutlined'
import { IconButton } from '@material-ui/core'
import Textarea from 'react-textarea-autosize';
import CreateTwoToneIcon from '@material-ui/icons/CreateTwoTone'

const CardContainer = styled.div`
    margin-bottom: 8px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    position: relative;
`

class TrelloCard extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isEdit: false,
            text: this.props.text
        }
    }

    handleInputChange = e => {
        this.setState({
            text: e.target.value
        })
    }

    render() {
        const { text, id, index, listIndex, dispatch } = this.props
        return (
            <Draggable draggableId={String(id)} index={index} >
                {provided => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} >
                        {
                            this.state.isEdit ?
                                <Textarea value={this.state.text}
                                    onChange={this.handleInputChange}
                                    style={{
                                        resize: "none",
                                        width: '40%',
                                        overflow: 'hidden',
                                        outline: 'none',
                                        border: 'none',
                                        borderRadius: 5,
                                        padding:10
                                    }}
                                />
                                :
                                <CardContainer>
                                    <Card>
                                        <CardContent>
                                            <Typography gutterBottom>
                                                {text}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', position:'absolute', marginLeft:230 }} >
                                        {/* <IconButton variant="outlined" color="primary" size="small"
                                            onClick={(index) => {
                                                this.setState({
                                                    isEdit: !this.state.isEdit
                                                })
                                                dispatch(editCard(index, listIndex, this.state.text))
                                            }}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <CreateTwoToneIcon fontSize="small" />
                                        </IconButton> */}
                                        <IconButton
                                            onClick={() => {
                                                dispatch(deleteCard(index, listIndex))
                                            }}
                                        >
                                            <DeleteOutlined />
                                        </IconButton>
                                    </div>
                                </CardContainer>
                        }
                    </div>
                )}
            </Draggable>
        )
    }
}


export default TrelloCard

