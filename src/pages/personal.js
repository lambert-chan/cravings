import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

class PersonalPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: '',
            location_list: []
        }
    }
    handleSelection = ({ label, value }) => {
        console.log(value)
        this.setState({
            location_list: [...this.state.location_list, value]
        })
    }
    render() {
        const { location } = this.state;
        return (
            <Container component="main" className="main">
                <Typography component="h1">
                    Start with a location
            </Typography>
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
                            onChange: this.handleSelection,
                        }}
                    />
                </div>
                {this.state.location_list.map(location => (
                    <p key={location?.place_id}>{location?.description}</p>
                ))}
            </Container>
        );
    }
}

export default PersonalPage