import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import ListAlt from '@material-ui/icons/ListAlt'
import Container from '@material-ui/core/Container';
import axios from 'axios'
import { ENDPOINT } from '../constants/api'
import { Snackbar, CircularProgress } from '@material-ui/core';
import { Alert } from '../components/Modals'
import { useHistory } from 'react-router-dom'

function LoginPage({ callBack }) {
    const initialData = {
        name: '',
        email: '',
        password: '',
    }
    const history = useHistory()

    const [hasAccount, setHasAccount] = useState(true);
    const [formData, updateFormData] = useState(initialData);
    const [alertStatus, setAlertStatus] = useState(false);
    const [errorStatus, setErrorStatus] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const handleChange = e => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        })
    }

    const handleSubmit = e => {
        e.preventDefault();

        setIsLoggingIn(true)
        let dataString = `email=${formData?.email}&password=${formData?.password}`
        axios.post(ENDPOINT + '/users/login', dataString)
            .then(resp => {
                let data = resp.data;
                updateFormData(initialData)
                setIsLoggingIn(false)
                history.push('/')
                if (callBack) {
                    callBack(data)
                }
            }).catch(err => {
                setIsLoggingIn(false)
                setErrorStatus(true)
            })
    }

    function handleRegister(e) {
        e.preventDefault();
        setIsRegistering(true)
        var isFilled = true
        let keys = Object.keys(formData)
        for (let i = 0; i < keys.length; i++) {
            if (formData[keys[i]] === '') {
                isFilled = false
            }
        }
        if (!isFilled) {
            return
        }
        let dataString = `name=${formData?.name}&email=${formData?.email}&password=${formData?.password}`
        axios.post(ENDPOINT + '/users/register', dataString)
            .then(res => {
                setAlertStatus(true);
                updateFormData(initialData)
                setHasAccount(true)
                setIsRegistering(false)
            }).catch(err => {
                console.error(err)
            })
    }

    const toggleForm = () => {
        setHasAccount(!hasAccount)
        updateFormData(initialData)
    }

    const handleAlertClose = () => {
        setAlertStatus(false)
    }

    const handleErrorClose = () => {
        setErrorStatus(false)
    }


    return (
        <Container component="main" maxWidth="xs" className="login-container">
            <div className='paper'>
                {hasAccount ?
                    <>
                        <LockOutlinedIcon className='avatar' fontSize="large" />
                        <h2>Sign in</h2>
                        <form id='loginForm' className='form' noValidate onSubmit={handleSubmit}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={handleChange}
                                value={formData?.email}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                onChange={handleChange}
                                value={formData?.password}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                className='submit'
                            >
                                {isLoggingIn ? <CircularProgress /> : 'Sign In'}
                            </Button>
                            <p>Don't have an account?</p>
                            <Button
                                type="button"
                                className='register'
                                onClick={toggleForm}
                            >
                                Register</Button>
                        </form>
                    </> :
                    <>
                        <ListAlt className='avatar' fontSize="large" />
                        <h2>Register</h2>
                        <form id='registerForm' className='form'
                            onSubmit={handleRegister}
                            noValidate>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="Username"
                                name="name"
                                onChange={handleChange}
                                value={formData?.name}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={handleChange}
                                value={formData?.email}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                onChange={handleChange}
                                value={formData?.password}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                className='register'
                            >
                                {isRegistering ? <CircularProgress /> : 'Register'}
                            </Button>
                            <p>Have an account already?</p>
                            <Button
                                type="button"
                                variant="contained"
                                className='submit'
                                onClick={toggleForm}
                            >
                                Sign In</Button>
                        </form>
                    </>}
            </div>
            <Snackbar open={alertStatus} autoHideDuration={6000} onClose={handleAlertClose}>
                <Alert onClose={handleAlertClose} severity="success">
                    Registration successful, you may now login.
                </Alert>
            </Snackbar>
            <Snackbar open={errorStatus} autoHideDuration={6000} onClose={handleErrorClose}>
                <Alert onClose={handleErrorClose} severity="error">
                    There's an error with signing in
                </Alert>
            </Snackbar>
        </Container>
    );
}

export default LoginPage
