import React, { Component } from 'react'

import { Components, withList, withCurrentUser, registerComponent } from 'meteor/vulcan:core';

class MeetingsPage extends Component {
    state = {  }
    render() {
        return (
            <div>
            <h1>Meetings</h1>
            </div>
        )
    }
}

export default MeetingsPage

registerComponent('MeetingsPage', MeetingsPage);