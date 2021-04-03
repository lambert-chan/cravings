import React from 'react';
import Container from '@material-ui/core/Container';
import Chip from '@material-ui/core/Chip';
import Rating from '@material-ui/lab/Rating';
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'

class Explore extends React.Component {
    render() {
        return (
            <Container component="main">
                <div className="lists">
                    <h1>Explore</h1>
                    <Card className="list-card">
                        <CardHeader title="List Name" subheader="List Description" />
                        <CardContent>
                            List
                            </CardContent>
                        <Chip label="vancouver" />
                        <Rating name="read-only" value={2} readOnly />
                    </Card>
                </div>
            </Container>
        );
    }
}

export default Explore