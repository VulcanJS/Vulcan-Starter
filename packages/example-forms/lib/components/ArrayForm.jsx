import React, { Component } from 'react'
import { registerComponent } from 'meteor/vulcan:core'

class ArrayForm extends Component {
    state = {  }
    render() {
        return (
            <div>
            Array Control not yet implemented
            </div>
            
        )
    }
}

export default ArrayForm
registerComponent('ArrayForm',ArrayForm)