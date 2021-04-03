import React from 'react';
import Container from '@material-ui/core/Container';
import person from '../img/person-thinking.png'

class HomePage extends React.Component {
    render() {
        return (
            <Container component="main">
                <div className="main">
                    <div className="description">
                        <h1>What are you craving?</h1>
                        <p>Explore and take a look at what other people are craving or create your own list to keep track of places that you want to try</p>
                    </div>
                    <img src={person} alt="person-thinking" className="home-image"></img>
                </div>
            </Container>
        );
    }
}

export default HomePage