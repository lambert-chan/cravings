import React from 'react';
import { Button, Card, CardHeader, IconButton, Container } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit'
import ListForm from '../components/ListForm'
import { DeleteModal } from '../components/Modals'
import axios from 'axios'
import { ENDPOINT } from '../constants/api'
import { WaitingCat } from '../components/Loading'

// const defaultLists = [
//     {
//         name: "Richmond Japanese Hidden Gems",
//         description: "The best Japanese restaurants to try",
//         restaurants: ['Sushi Aria', 'Sushi Lovers'],
//         tags: ['richmond', 'japanese'],
//         is_private: false,
//     },
//     {
//         name: "Vancouver Sushi Restaurants",
//         description: "Vancouver's best sushi",
//         restaurants: ['Minami', 'Sushi California'],
//         tags: ['vancouver', 'japanese'],
//         is_private: false,
//     },
//     {
//         name: "Restaurants to avoid",
//         description: "Don't bother trying these places",
//         restaurants: ['Restaurant 1', 'Restaurant 2'],
//         tags: ['richmond', 'vancouver', 'burnaby'],
//         is_private: false,
//     }
// ]

class PersonalPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lists: [],
            showListForm: false,
            selectedFormData: {},
            showDeleteModal: false,
            showLoading: false,
            selectedLid: null
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

    deleteWarning = data => {
        this.setState({
            showDeleteModal: true,
            selectedLid: data?.id
        })
    }

    closeDeleteWarning = resp => {
        if (resp) {
            // do true
            this.setState({
                showListForm: false
            })
            const { selectedLid} = this.state
            let apiKey = sessionStorage.getItem('apiKey')
            axios.delete(ENDPOINT + `/lists/id=${selectedLid}&apiKey=${apiKey}`)
            .then(res => {
                console.log(res)
                this.getLists()
            }).catch(err => {
                console.log(err)
            })
        } else {
            // do false
        }
        this.setState({
            showDeleteModal: false,
        })
    }

    handleSave = (resp, isNew) => {
        let apikey = sessionStorage.getItem('apiKey')
        let data = {
            ...resp,
            restaraunts: resp.restaurants
        }
        let dataString = `apiKey=${apikey}&list=${JSON.stringify(data)}`
        this.setState({
            showListForm: false,
            showLoading: true
        })
        if (isNew) {
            axios.post(ENDPOINT + '/lists', dataString)
                .then(res => {
                    console.log(res)
                    // get all lists again
                    this.getLists()
                    this.setState({
                        showLoading: false
                    })
                }).catch(err => {
                    this.setState({
                        showLoading: false
                    })
                })
        } else {
            axios.put(ENDPOINT + '/lists', dataString)
                .then(res => {
                    console.log(res)
                    // get all lists again
                    this.getLists()
                    this.setState({
                        showLoading: false
                    })
                }).catch(err => {
                    this.setState({
                        showLoading: false
                    })
                })
        }
    }

    getLists = () => {
        let apikey = sessionStorage.getItem('apiKey')
        this.setState({
            showLoading: true
        })
        axios.get(ENDPOINT + `/lists/getByUser?apiKey=${apikey}`)
            .then(res => {
                let lists = res?.data?.response
                if (lists[0].id == null) {
                    this.setState({
                        showLoading: false
                    })
                    return
                }
                this.setState({
                    lists: res.data.response ?? []
                })
            })
    }

    componentDidMount() {
        this.getLists()
    }

    render() {
        const { lists, selectedFormData, showDeleteModal, showListForm, showLoading } = this.state;
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
                            showLoading ? <WaitingCat /> :
                                <p>You have not created any lists yet.</p>
                    }
                </div>
                {showDeleteModal &&
                    <DeleteModal
                        isOpen={showDeleteModal}
                        onClose={this.closeDeleteWarning}
                        content="This will permanently delete the list"
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