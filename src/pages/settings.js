import React, { useState, useEffect } from 'react'
import { Button, TextField } from '@material-ui/core'
import SettingsIcon from '@material-ui/icons/Settings'
import { DeleteModal } from '../components/Modals'
import axios from 'axios';
import { ENDPOINT } from '../constants/api'
import { useHistory } from 'react-router-dom'

const defaultUser = {
    name: '',
    email: ''
}

function SettingsPage() {
    const [isDeleteModalOpen, setDeleteModalStatus] = useState(false)
    const [data, setData] = useState(defaultUser)
    const history = useHistory();
    const getUserData = () => {
        // get from sessionid
    }

    useEffect(() => {
        getUserData()
    })

    const handleNameChange = e => {
        let key = e.target.name;
        let value = e.target.value;
        setData({
            ...data,
            [key]: value
        })
    }

    const handleSave = e => {
        e.preventDefault()
        let api_key = sessionStorage.getItem('apiKey')
        let dataString = `apKey=${api_key}&name=${data.name}&email=${data.email}`
        axios.put(ENDPOINT + '/users', dataString)
            .then(res => {
                console.log(res)
            })
    }

    const handleDelete = e => {
        setDeleteModalStatus(true)
    }

    const onCloseModal = resp => {
        if (resp) {
            let api_key = sessionStorage.getItem('apiKey')
            let dataString = `/apiKey=${api_key}`
            axios.delete(ENDPOINT + '/users', {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: {
                    source: dataString
                }
            })
                .then(res => {
                    console.log(res)
                    history.push('/')
                })
        }
        setDeleteModalStatus(false)
    }

    useEffect(() => {
        let storageEmail = sessionStorage.getItem('email')
        let storageName = sessionStorage.getItem('name')
        setData({ name: storageName, email: storageEmail })
    }, [])

    return (
        <div id="settings-container">
            <form id='settings-form' className='form' noValidate>
                <h3>
                    <SettingsIcon />
                    Settings
                </h3>
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Name"
                    name="name"
                    type="name"
                    onChange={handleNameChange}
                    value={data.name}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    onChange={handleNameChange}
                    value={data.email}
                />
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <Button
                        variant="contained"
                        style={{ backgroundColor: '#1183ca', color: 'white' }}
                        onClick={handleSave}
                    >
                        Save
                                </Button>
                    <Button
                        variant="contained"
                        style={{ backgroundColor: '#90323d', color: 'white' }}
                        onClick={handleDelete}
                    >
                        Delete
                                </Button>
                </div>
            </form>
            <DeleteModal
                isOpen={isDeleteModalOpen}
                content="This will permamnently delete your account. Are you sure?"
                onClose={onCloseModal}
            />
        </div>
    )
}

export default SettingsPage;