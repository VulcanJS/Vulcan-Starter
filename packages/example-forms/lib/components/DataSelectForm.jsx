/**
 * A multiple select with autocompletion, to get foreign keys
 * 
 * TODO: this is a dirty example
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import { registerComponent, withList, Components, getFragment } from 'meteor/vulcan:core'



const SelectInput = ({
    results,
    loading,
    multiple,
    value,
    onChange,
    updateCurrentValues,
    name,
    labelKey,
    valueKey,
    optionRenderer,
    clientSideSort,
    ...otherProps,
    }) => {
    // we can provide a complex sort function in the props
    const options = !loading && results && results.length
        ? results
        : []
    const sortedOptions = clientSideSort ? clientSideSort(options) : options
    return (
        <Select
            multi={multiple}
            value={!value && multiple ? [] : value}
            onChange={onChange}
            name={name}
            options={sortedOptions}
            valueKey={valueKey}
            labelKey={labelKey}
            optionRenderer={optionRenderer || undefined}
        />

    )
}

class DataSelectForm extends Component {
    constructor(props) {
        super(props)
        this.updateValue = this.updateValue.bind(this)
    }

    componentWillMount(){
        // add to the autofilled values
        //@see https://github.com/VulcanJS/Vulcan/issues/1884
        if (this.props.value) {
            this.context.addToAutofilledValues({[this.props.name]: this.props.value});
        }
    }

    state = {
    }

    updateValue(value) {
        const { name, multiple, valueKey = '_id' } = this.props // field name
        this.context.updateCurrentValues({
            // we only store the id, Meteor then fetch the actual data
            [name]: multiple ? value.map(v => v[valueKey]) : value[valueKey]
        })
    }

    render() {
        const { label, fragmentName, ...otherProps } = this.props
        const options = {
            collection: this.props.collection,
            fragment: fragmentName ? getFragment(fragmentName) : undefined,
            ...this.props.options
        }


        const SelectInputWithData = withList(options)(SelectInput);
        return (
            <div className="form-group row">
                <label className="control-label col-sm-3">{label}</label>
                <div className="col-sm-9">
                    <SelectInputWithData
                        {...otherProps}
                        onChange={this.updateValue}
                    />
                </div>
            </div>
        )
    }
}
DataSelectForm.contextTypes = {
    updateCurrentValues: PropTypes.func,
    addToAutofilledValues: PropTypes.func
};
DataSelectForm.propTypes = {
    collection: PropTypes.any, // a collection used to get the data
    terms: PropTypes.object, // the qury terms for withList
    clientSideSort: PropTypes.func, // a complex sort function that is applied after getting the data
    name: PropTypes.string.isRequired, // the field name
    label: PropTypes.string,
}

export default DataSelectForm
registerComponent('DataSelectForm', DataSelectForm)