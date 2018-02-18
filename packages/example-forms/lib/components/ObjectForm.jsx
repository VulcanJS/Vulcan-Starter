/**
 * Generate a form for nested schemas
 * 
 * TODO: this is a simplistic component written in a few minutes to get 
 * a working solution.
 * 
 * Instead, we should base it on the existing FormComponent, that is already able to generate 
 * a form given a simple-schema schema.
 */
import React, { Component } from 'react'
import { Components, registerComponent } from 'meteor/vulcan:core';
import { PropTypes } from 'prop-types';


class ObjectForm extends Component {
    constructor(props) {
        super(props)
        this.updateValue = this.updateValue.bind(this)
        this.submitUpdate = this.submitUpdate.bind(this)
        this.state = {
            value: props.value,
        }
    }

    componentWillMount() {
        // add to the autofilled values
        //@see https://github.com/VulcanJS/Vulcan/issues/1884
        if (this.props.value) {
            this.context.addToAutofilledValues({ [this.props.name]: this.props.value });
        }
    }

    submitUpdate() {
        const { name } = this.props // field name
        const { value } = this.state
        this.context.updateCurrentValues({
            // we only store the id, Meteor then fetch the actual data
            [name]: value
        })
    }
    updateValue(fieldName, fieldValue) {
        const { name, value } = this.props // field name
        this.setState({ value: { ...value, [fieldName]: fieldValue } })
    }
    render() {
        const { objectSchema, value, label, ...otherProps } = this.props
        const currentValue = this.state.value || value
        return (
            <div>
                {label && <div>
                    <strong>{label}</strong>
                </div>}
                {
                    Object.keys(objectSchema).map(fieldName => (
                        <Components.FormComponentDefault
                            {...otherProps}
                            key={fieldName}
                            onChange={
                                (objectName, fieldValue) => {
                                    this.updateValue(fieldName, fieldValue)
                                }
                            }
                            value={currentValue[fieldName] || ''}
                            label={objectSchema[fieldName].label}
                            control={objectSchema[fieldName].label}
                            onBlur={this.submitUpdate}
                        />

                    ))
                }
            </div>
        )
    }
}

ObjectForm.contextTypes = {
    updateCurrentValues: PropTypes.func,
    addToAutofilledValues: PropTypes.func
};

export default ObjectForm
registerComponent('ObjectForm', ObjectForm)