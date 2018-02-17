import React, { Component } from 'react'

import { Components, registerComponent } from 'meteor/vulcan:core';
import Customers from '../modules/customers/collection'


class CustomersPage extends Component {
    state = {}
    render() {
        return (
            <div>
                <h1>Customers</h1>
                <h2>Add a customer</h2>
            </div>
        )
    }
}

export default CustomersPage

registerComponent('CustomersPage', CustomersPage);