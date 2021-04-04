import React from 'react';
import Chip from '@material-ui/core/Chip';
import Rating from '@material-ui/lab/Rating';
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import { List, ListItem, ListItemText } from '@material-ui/core';

export default class RestaurantList extends React.Component {

    checkFilter() {
        const { data, filter } = this.props;
        let card_cats = data?.category
        for (let i = 0; i < card_cats.length; i++) {
            let name = card_cats[i]
            if (filter.includes(name)) {
                return true
            }
        }
        return false
    }

    render() {
        const { data } = this.props;
        let isHidden = this.checkFilter();
        return (
            <Card className="list-card" style={{display: isHidden ? '' : 'none'}}>
                <CardHeader title={data?.name} subheader={data?.description} />
                <CardContent>
                    <List>
                        {data?.list.map(item =>
                            <ListItem key={item}>
                                <ListItemText>{item}</ListItemText>
                            </ListItem>)}
                    </List>
                </CardContent>
                <div style={{ display: 'flex' }}>
                    {data?.category.map(cat =>
                        <Chip key={cat} label={cat} />
                    )}
                </div>
                <Rating name="read-only" value={data?.rating} readOnly />
            </Card>
        )
    }
}