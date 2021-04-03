import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Container from '@material-ui/core/Container';



export default class RegisterPage extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = { name: '', email:'', password:'' };
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
      }

    handleSubmit = (event) => {
        var formBody = "name=" + this.state.name + "&email=" + this.state.email + "&password=" 
        + this.state.password;
          fetch('http://vladkubl.mywhc.ca/users/API/v1/users/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: formBody 
        }).then(function(response) {
            return response.json()
          }).then(function(json) {
              console.log(json);
            if (json.response == "Email present") {
                window.alert("Sorry that email is already in use!")
                return;
            }
            else {
                window.alert("User added successfully");
                return;
            }
          })
          event.preventDefault();
    }

    render() {
        const {name, email, password} = this.state;
        return (
            <Container component="main" maxWidth="xs" className="register-container">
            <div className='paper'>

                <LockOutlinedIcon className='avatar' fontSize="large"/>
                <h2>Register</h2>
                <form className='form'
                 onSubmit={this.handleSubmit}
                 noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        name="name"
                        autoComplete="name"
                        value={name}
                        onChange={this.handleChange}
                        autoFocus
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
                        Register
          </Button>
                </form>
            </div>
        </Container>
    );
        
        
    }

}

// App.propTypes = { action: React.PropTypes.string.isRequired, method: React.PropTypes.string}
