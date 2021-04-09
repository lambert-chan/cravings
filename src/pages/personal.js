import React from 'react';
import { Button, Card, CardHeader, IconButton, Container } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit'
import ListForm from '../components/ListForm'
import { DeleteModal } from '../components/Modals'

const defaultLists = [
    {
        name: "Richmond Japanese Hidden Gems",
        description: "The best Japanese restaurants to try",
        restaurants: ['Sushi Aria', 'Sushi Lovers'],
        tags: ['richmond', 'japanese'],
        is_private: false,
    },
    {
        name: "Vancouver Sushi Restaurants",
        description: "Vancouver's best sushi",
        restaurants: ['Minami', 'Sushi California'],
        tags: ['vancouver', 'japanese'],
        is_private: false,
    },
    {
        name: "Restaurants to avoid",
        description: "Don't bother trying these places",
        restaurants: ['Restaurant 1', 'Restaurant 2'],
        tags: ['richmond', 'vancouver', 'burnaby'],
        is_private: false,
    }
]

class PersonalPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lists: defaultLists,
            showListForm: false,
            selectedFormData: {},
            showDeleteModal: false
        }
    }

    openListForm = data => {
        this.setState({
            showListForm: true,
            selectedFormData: data
        })
    }

    closeListForm = () => {
        this.setState({
            showListForm: false
        })
    }

    deleteWarning = () => {
        console.log('show delete warning')
        this.setState({
            showDeleteModal: true
        })
    }

    closeDeleteWarning = resp => {
        if (resp) {
            // do true
            this.setState({
                showListForm: false
            })
        } else {
            // do false
        }
        this.setState({
            showDeleteModal: false,
        })
    }

    handleSave = resp => {
        console.log(resp);
        // Post Resp
    }

    render() {
        const { lists, selectedFormData, showDeleteModal, showListForm } = this.state;
        return (
            <Container component="main" className="main">
                <Button
                    variant="contained"
                    onClick={() => { this.openListForm() }}
                >
                    Create New List
                    </Button>
                {
                    showListForm &&
                    <ListForm
                        data={selectedFormData}
                        isOpen={showListForm}
                        onClose={this.closeListForm}
                        onDelete={this.deleteWarning}
                        onSave={this.handleSave}
                    />
                }
                <div id="mylists-container">
                    {
                        lists.length !== 0 ?
                            lists.map(list => List(list?.name, list?.description, () => { this.openListForm(list) }))
                            :
                            <span>You have not created any lists</span>
                    }
                </div>
                {showDeleteModal &&
                    <DeleteModal
                        isOpen={showDeleteModal}
                        onClose={this.closeDeleteWarning}
                        content="This will delete the list permanently"
                    />
                }
            </Container>
        );
    }
}

function List(title, description, onEdit) {
    return (
        <Card className="list-card" key={title}>
            <CardHeader title={title} subheader={description} />
            <IconButton aria-label="edit" style={{ color: 'goldenrod' }} onClick={onEdit}>
                <EditIcon fontSize="inherit" />
            </IconButton>
        </Card>
    )
}

export default PersonalPage