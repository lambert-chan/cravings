import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Container from '@material-ui/core/Container';




export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = { email:'', password:'' };
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
      }

    handleSubmit = (event) => {
        var formBody = "email=" + this.state.email + "&password=" 
        + this.state.password;
          fetch('http://vladkubl.mywhc.ca/users/API/v1/users/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: formBody 
        }).then(function(response) {
            return response.json()
          }).then(function(json) {
              console.log(json);
              localStorage.setItem("uid", json.id);
              localStorage.setItem("is_admin", json.is_admin.data)

          })
          event.preventDefault();
    }


    render() {
        const {email, password} = this.state;
        return (
            <Container component="main" maxWidth="xs" className="login-container">
                <div className='paper'>

                    <LockOutlinedIcon className='avatar' fontSize="large"/>
                    <h2>Sign in</h2>
                    <form className='form'
                 onSubmit={this.handleSubmit}
                 noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={email}
                        onChange={this.handleChange}
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
                        value={password}
                        onChange={this.handleChange}
                        autoComplete="current-password"
                    />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            className='submit'
                        >
                            Sign In
            </Button>
                    </form>
                </div>
            </Container>
        );
    }
}