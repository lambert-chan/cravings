import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import ListAlt from '@material-ui/icons/ListAlt'
import Container from '@material-ui/core/Container';
import moment from 'moment'

function LoginPage() {
    const initialData = {
        name: '',
        email: '',
        password: '',
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
        console.log(formData);
        var submission_time = moment(e?.timestamp);
        console.log(submission_time)
    }

    return (
        <Container component="main" maxWidth="xs" className="login-container">
            <div className='paper'>
                {hasAccount ?
                    <>
                        <LockOutlinedIcon className='avatar' fontSize="large" />
                        <h2>Sign in</h2>
                        <form className='form' noValidate onSubmit={handleSubmit}>
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
                        <form className='form' noValidate>
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
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
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