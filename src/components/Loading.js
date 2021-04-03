import React from 'react'
import waiting from '../img/waiting-cat.gif'

export class WaitingCat extends React.Component {
    render() {
        return (
            <div>
                <img id="waiting-cat" src={waiting} alt='waiting-cat'></img>
                <p>Please be patient...</p>
            </div>
        )
    }
}