import React from 'react';
import Container from '@material-ui/core/Container';
import person from '../img/person-thinking-food.png'
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

class HomePage extends React.Component {
    render() {
        return (
            <Container component="main" className="main-container">
                <div className="main">
                    <div className="description">
                        <h1>What are you craving?</h1>
                        <p>Explore and take a look at what other people are craving or create your own list to keep track of places that you want to try</p>
                        <Button
                            variant="contained"
                            disableElevation={true}
                        >
                            <Link to="/explore">Explore</Link>
                            </Button>
                    </div>
                    <img src={person} alt="person-thinking" className="home-image"></img>
                </div>
            </Container>
        );
    }
}

export default HomePage