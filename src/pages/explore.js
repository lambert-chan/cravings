import React from 'react';
import Container from '@material-ui/core/Container';
import RestaurantList from '../components/RestaurantList'
import { tagsList } from '../constants/tags'
import { Checkbox, FormControlLabel, FormGroup } from '@material-ui/core';
import axios from 'axios'
import { ENDPOINT } from '../constants/api'

// const defaultLists = [
//     {
//         name: "Richmond Japanese Hidden Gems",
//         description: "The best Japanese restaurants to try",
//         restaurants: ['Sushi Aria', 'Sushi Lovers'],
//         tags: ['richmond', 'japanese'],
//         is_private: false,
//     },
//     {
//         name: "Vancouver Sushi Restaurants",
//         description: "Vancouver's best sushi",
//         restaurants: ['Minami', 'Sushi California'],
//         tags: ['vancouver', 'japanese'],
//         is_private: false,
//     },
//     {
//         name: "Restaurants to avoid",
//         description: "Don't bother trying these places",
//         restaurants: ['Restaurant 1', 'Restaurant 2'],
//         tags: ['richmond', 'vancouver', 'burnaby'],
//         is_private: false,
//     },
//     {
//         name: "Chinese Restaurants to avoid",
//         description: "Don't bother trying these places",
//         restaurants: ['Restaurant 1', 'Restaurant 2'],
//         is_private: false,
//         tags: ['chinese'],
//     },
//     {
//         name: "The best of Burnaby",
//         description: "You have to try these places",
//         restaurants: ['Location 1', 'Location 2'],
//         tags: ['burnaby'],
//         is_private: false,
//     },
// ]

const categories = tagsList

class Explore extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCategories: tagsList,
            lists: []
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

    async componentDidMount() {
        let data = await axios.get(ENDPOINT + '/lists/getAll')
            .then(res => {
                return res.data.response
            }).catch(err => {
                console.debug('Error has occurred')
            })
        this.setState({
            lists: data
        })
    }

    render() {
        const { lists, selectedCategories } = this.state;
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
                            key={category}
                        />)}
                </FormGroup>
                <div className="lists">
                    {
                            lists ? lists.map(list =>
                                <RestaurantList key={list?.name + Math.random()} data={list} filter={selectedCategories} />)
                                : <p>Sorry, server is down right now.</p>
                    }
                </div>
            </Container>
        );
    }
}

export default Explore