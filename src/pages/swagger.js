import React from 'react'
import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"

let myUrl = "https://cravings.lambertchan.ca/api/swagger.json"
let workingURL = "https://petstore.swagger.io/v2/swagger.json"

export default class Swagger extends React.Component {
    render() {
        return (
            <div id="swaggerContainer">
                <SwaggerUI url={myUrl} />
            </div>
        )
    }
}
