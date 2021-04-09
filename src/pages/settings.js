import React, { useState, useEffect } from 'react'
import { Button, TextField } from '@material-ui/core'
import SettingsIcon from '@material-ui/icons/Settings'
import { DeleteModal } from '../components/Modals'
import axios from 'axios';
import { ENDPOINT } from '../constants/api'

const data = {
    name: 'username',
    email: 'email@email.com'
}

function SettingsPage() {
    const [isDeleteModalOpen, setDeleteModalStatus] = useState(false)

    const getUserData = () => {
        // get from sessionid
    }

    useEffect(() => {
        getUserData()
    })

    const handleNameChange = (e, v) => {
        console.log(v)
    }

    const handleSave = resp => {
        console.log(resp)
        // Axios Put
    }

    const handleDelete = () => {
        console.log('delete')
        // Axios Delete
        setDeleteModalStatus(true)
    }

    const onCloseModal = resp => {
        if (resp) {

        } else {

        }
        setDeleteModalStatus(false)
    }

    return (
        <div id="settings-container">
            <form id='settings-form' className='form' noValidate onSubmit={() => { }}>
                <h3>
                    <SettingsIcon />
                    Settings
                </h3>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Name"
                    name="name"
                    defaultValue={data?.name}
                    type="text"
                    autoFocus
                    onChange={handleNameChange}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    defaultValue={data?.email}
                    autoFocus
                    onChange={handleNameChange}
                />
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <Button
                        type="submit"
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