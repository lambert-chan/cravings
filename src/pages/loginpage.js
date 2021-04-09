import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import ListAlt from '@material-ui/icons/ListAlt'
import Container from '@material-ui/core/Container';
import moment from 'moment'
// import axios from 'axios'
import {ENDPOINT} from '../constants/api'

function LoginPage({ callBack }) {
    const initialData = {
        name: '',
        email: '',
        password: '',
        registerEmail: '',
        registerPassword: '',
        isAdmin: false,
    }
    const [hasAccount, setHasAccount] = useState(true);
    const [formData, updateFormData] = useState(initialData);

    const handleChange = e => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        })
    }

    const handleSubmit = e => {
        e.preventDefault();

        var submission_time = moment(e?.timestamp);
        console.log(submission_time);
        var formBody = "email=" + formData.email + "&password="
            + formData.password;
        fetch(ENDPOINT + '/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: formBody
        }).then(function (response) {
            return response.json()
        }).then(function (json) {
            console.log(json.response);
            if (json.response === "User not found!" || json.response === "Passwords do not match!") {
                window.alert("Login Failed! Either email or password are incorrect!")
            }
            else {
                if (callBack) {
                    callBack();
                }
            }

        })
    }

    const handleRegister = e => {
        e.preventDefault();
        let formDataUrl = "name=" + formData.name + "&email=" + formData.registerEmail + "&password="
            + formData.registerPassword;
        fetch(ENDPOINT + '/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: formDataUrl
        }).then(function (response) {
            return response.json()
        }).then(function (json) {
            console.log(json.response)
            if (json.response === "Email present") {
                window.alert("Registration failed email already in use!")
            }
            if (json.response === "Registered") {
                if (callBack) {
                    callBack();
                }
            }
        })

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
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={handleChange}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={handleChange}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                className='submit'
                            >
                                Sign In</Button>
                            <p>Don't have an account?</p>
                            <Button
                                type="button"
                                className='register'
                                onClick={() => setHasAccount(false)}
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
                                id="name"
                                label="Username"
                                name="name"
                                autoFocus
                                onChange={handleChange}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="registerEmail"
                                label="Email Address"
                                name="registerEmail"
                                autoComplete="email"
                                onChange={handleChange}
                                autoFocus
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="registerPassword"
                                label="Password"
                                type="password"
                                id="registerPassword"
                                autoComplete="current-password"
                                onChange={handleChange}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                className='register'
                            >
                                Register</Button>
                            <p>Have an account already?</p>
                            <Button
                                type="button"
                                variant="contained"
                                className='submit'
                                onClick={() => setHasAccount(true)}
                            >
                                Sign In</Button>
                        </form>
                    </>}
            </div>
        </Container>
    );
}

export default LoginPage
