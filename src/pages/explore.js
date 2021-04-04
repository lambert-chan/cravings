import React from 'react';
import Container from '@material-ui/core/Container';
import RestaurantList from '../components/RestaurantList'
import { Checkbox, FormControlLabel, FormGroup } from '@material-ui/core';

const defaultLists = [
    {
        name: "Richmond Japanese Hidden Gems",
        description: "The best Japanese restaurants to try",
        list: ['Sushi Aria', 'Sushi Lovers'],
        category: ['richmond', 'japanese'],
        rating: 5
    },
    {
        name: "Vancouver Sushi Restaurants",
        description: "Vancouver's best sushi",
        list: ['Minami', 'Sushi California'],
        category: ['vancouver', 'japanese'],
        rating: 4
    },
    {
        name: "Restaurants to avoid",
        description: "Don't bother trying these places",
        list: ['Restaurant 1', 'Restaurant 2'],
        category: ['richmond', 'vancouver', 'burnaby'],
        rating: 2
    },
    {
        name: "Chinese Restaurants to avoid",
        description: "Don't bother trying these places",
        list: ['Restaurant 1', 'Restaurant 2'],
        category: ['chinese'],
        rating: 1
    },
    {
        name: "The best of Burnaby",
        description: "You have to try these places",
        list: ['Location 1', 'Location 2'],
        category: ['burnaby'],
        rating: 3
    },
]

const categories = [
    'richmond',
    'vancouver',
    'burnaby',
    'japanese',
    'chinese',
]

class Explore extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCategories: [
                'richmond',
                'japanese',
            ]
        }
    }

    handleChange = e => {
        const { selectedCategories } = this.state;
        let name = e.target.name
        let checked = selectedCategories.includes(name)
        this.setState({
            selectedCategories: checked ?
                selectedCategories.filter(e => e !== name) : [...selectedCategories, name]
        })
    }
    render() {
        const { selectedCategories } = this.state;
        return (
            <Container component="main">
                <h1>Explore</h1>
                <FormGroup row>
                    {categories.map(category =>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={selectedCategories.includes(category)}
                                    onChange={this.handleChange}
                                    name={category}
                                    style={{ color: "white" }}
                                />
                            }
                            label={category}
                        />)}
                </FormGroup>
                <div className="lists">
                    {
                        defaultLists.map(list =>
                            <RestaurantList data={list} filter={selectedCategories} />)
                    }
                </div>
            </Container>
        );
    }
}

export default Explore