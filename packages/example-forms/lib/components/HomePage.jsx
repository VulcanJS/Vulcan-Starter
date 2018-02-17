import React, { Component } from 'react'

import { Components, registerComponent } from 'meteor/vulcan:core';
import Customers from '../modules/customers/collection'
import Meetings from '../modules/meetings/collection'


class HomePage extends Component {
    state = {}
    render() {
        return (
            <div>
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