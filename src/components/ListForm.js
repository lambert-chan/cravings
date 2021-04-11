import React, { useState } from 'react'
import { Button, Checkbox, FormControlLabel, IconButton, Modal, TextareaAutosize, TextField } from '@material-ui/core'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { tagsList } from '../constants/tags'
import DeleteIcon from '@material-ui/icons/Delete'

const defaultList = {
    name: '',
    description: '',
    tags: [],
    restaurants: [],
    is_private: true
}

function ListForm({ data, isOpen, onClose, onDelete, onSave }) {
    const [formElements, setFormElements] = useState(data ? data : defaultList);
    // eslint-disable-next-line no-unused-vars
    const [location, setLocation] = useState('');
    let isNew = data === undefined
    let tags = tagsList

    const handleClose = () => {
        if (onClose) {
            onClose()
        }
    }

    const handleTitleChange = e => {
        setFormElements({
            ...formElements,
            name: e?.currentTarget?.value
        })
    }

    const handleDescriptionChange = e => {
        setFormElements({
            ...formElements,
            description: e?.currentTarget?.value
        })
    }

    const handleTagChange = e => {
        let isChecked = e.currentTarget.checked
        let name = e.currentTarget.name
        setFormElements({
            ...formElements,
            tags: isChecked ? [...formElements.tags, name] : formElements.tags.filter(t => t !== name)
        })
    }

    const handleSelection = ({ label, value }) => {
        setFormElements({
            ...formElements,
            restaurants: formElements.restaurants + ';' + value.description
        })
    }

    const handleDeleteLocation = name => {
        let newList = formElements.restaurants.split(';').filter(l => l !== name)
        let newListString = '';
        newList.forEach(location => {
            newListString += location + ';'
        })
        setFormElements({
            ...formElements,
            restaurants: newListString
        })
    }

    const handlePrivacyCheck = e => {
        setFormElements({
            ...formElements,
            is_private: e?.currentTarget?.checked
        })
    }

    const handleSaveList = e => {
        e.preventDefault();
        let hasEmpty = false
        Object.keys(formElements).forEach(key => {
            // eslint-disable-next-line eqeqeq
            if (formElements[key] == false && key !== 'is_private') {
                hasEmpty = true
            }
        })

        if (hasEmpty) {
            alert('Not all fields are filled')
            return
        } else {
            if (onSave) {
                // convert restaurants into array
                let formData = {
                    ...formElements,
                    restaurants: formElements.restaurants.split(';')
                }
                onSave(formData, isNew);
            }
        }

    }

    const handleDeleteList = e => {
        e.preventDefault();
        if (onDelete) {
            onDelete(formElements);
        }
    }

    return (
        <Modal
            open={isOpen}
            onClose={handleClose}
            className="modal"
        >
            <div id="formList">
                <form id='loginForm' className='form' noValidate>
                    <h3>Title</h3>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="list_name"
                        label="Title"
                        name="list_name"
                        defaultValue={formElements?.name}
                        autoFocus
                        onChange={handleTitleChange}
                    />
                    <h3>Description</h3>
                    <TextareaAutosize
                        rowsMax={3}
                        required
                        onChange={handleDescriptionChange}
                        defaultValue={formElements?.description}
                    />
                    <h3>Tags</h3>
                    {
                        tags.map(tag => {
                            var defaultCheck = false
                            if (formElements.tags.includes(tag)) {
                                defaultCheck = true
                            }
                            return (
                                <FormControlLabel
                                    key={tag}
                                    control={<Checkbox
                                        defaultChecked={defaultCheck}
                                        onChange={handleTagChange}
                                        name={tag} />}
                                    label={tag}
                                />
                            )
                        }
                        )
                    }
                    <h3>Locations</h3>
                    <div id="locations-container">
                        <ul>
                            {
                                data !== undefined ?
                                    formElements.restaurants?.split(';').map(location => {
                                        return (
                                            Location(location, () => { handleDeleteLocation(location) })
                                        )
                                    })
                                :
                                    null
                            }
                        </ul>
                    </div>
                    <div className="autocomplete-container">
                        <GooglePlacesAutocomplete
                            apiKey="AIzaSyB4CuJ2RQrWSSPPA-9w7eZlAUgai2PmZIQ"
                            autocompletionRequest={{
                                types: ['establishment'],
                                componentRestrictions: {
                                    country: ['ca']
                                }
                            }}
                            selectProps={{
                                location,
                                onChange: handleSelection,
                            }}
                        />
                    </div>
                    <FormControlLabel
                        control={<Checkbox checked={formElements.is_private} onChange={handlePrivacyCheck} name="is_private" />}
                        label="Public can view"
                    />
                    <div className="list-form-controls">
                        <Button
                            type="submit"
                            variant="contained"
                            style={{ backgroundColor: '#1183ca', color: 'white' }}
                            onClick={handleSaveList}
                        >
                            Save
                                </Button>
                        <Button
                            variant="contained"
                            style={{ backgroundColor: '#90323d', color: 'white' }}
                            onClick={handleDeleteList}
                        >
                            Delete
                                </Button>
                    </div>
                </form>
            </div>
        </Modal>
    )
}

function Location(name, onDelete) {
    return (
        <li key={name}>
            {name}
            <IconButton aria-label="delete" style={{ color: 'darkred' }} onClick={onDelete}>
                <DeleteIcon fontSize="inherit" />
            </IconButton>
        </li>
    )
}

export default ListForm;