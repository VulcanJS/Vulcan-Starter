import React, { Component } from 'react'

import { Components, registerComponent } from 'meteor/vulcan:core';
import Customers from '../modules/customers/collection'
import Meetings from '../modules/meetings/collection'

import Helmet from 'react-helmet';

class HomePage extends Component {
    state = {}
    render() {
        return (
            <div>
                <Helmet>
                    <link
                        name="bootstrap"
                        rel="stylesheet"
                        type="text/css"
                        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.5/css/bootstrap.min.css"
                    />
                </Helmet>
                <h1>Customers</h1>
                <h2>Add a customer</h2>
                <Components.SmartForm
                    collection={Customers}
                />
                <h2>Add a meeting</h2>
                <Components.SmartForm
                    collection={Meetings}
                />
            </div>
        )
    }
}

export default HomePage

registerComponent('HomePage', HomePage);