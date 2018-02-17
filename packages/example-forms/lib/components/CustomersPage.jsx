import React, { Component } from 'react'

import { Components, withList, withCurrentUser, registerComponent } from 'meteor/vulcan:core';

class CustomersPage extends Component {
    state = {}
    render() {
        return (
            <div>
                <h1>Customers</h1>

            </div>
        )
    }
}

export default CustomersPage

registerComponent('CustomersPage', CustomersPage);