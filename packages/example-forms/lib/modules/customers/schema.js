/*

A SimpleSchema-compatible JSON schema for prospects

*/
import SimpleSchema from 'simpl-schema'
import { Components } from 'meteor/vulcan:core'
import { addressFormSchema } from '../address'
import ArrayForm from '../../components/ArrayForm'

// Defining the allowed value for the state field
// Using separate object is a good practice, since you might need those  info
// elsewhere in your app (e.g when displaying the data in a component)
export const stateAllowedValues = ['prospect', 'client', 'scheduled']
export const stateLabels = {
    prospect: "Prospect",
    client: "Client",
    scheduled: "Meeting scheduled",
}

const schema = {
    _id: {
        type: String,
        optional: true,
        viewableBy: ['guests'],
    },
    // document creation date is set automatically (optional + hidden + onInsert)
    createdAt: {
        type: Date,
        optional: true,
        hidden: true,
        onInsert: (document, currentUser) => {
            return new Date();
        }
    },
    // Who created the doc. This field is necessary for Vulcan to handle ownership
    // correctly when setting the permissions
    userId: {
        type: String,
        hidden: true,
        optional: true,
        onInsert(document, currentUser){
            document.userId = currentUser._id
        },
    },
    state: {
        type: String,
        allowedValues: stateAllowedValues,
        default: 'prospect',
        optional: false,
        searchable: true,
        form: {
            // the select options as a {value, label} object
            options: stateAllowedValues.map(value => ({
                value,
                label: stateLabels[value]
            }))
        },
        label: 'Client status',
        control: 'select',
        viewableBy: ['guests'],
        editableBy: ['guests'],
        insertableBy: ['guests'],
    },
    'name': {
        type: String,
        optional: false,
        label: 'Customer name',
        searchable: true,
        viewableBy: ['guests'],
        editableBy: ['guests'],
        insertableBy: ['guests'],
    },
    'email': {
        type: String,
        optional: true,
        label: `Email`,
        // SimpleSchema provides some nice default validator, as regex
        regEx: SimpleSchema.RegEx.EmailWithTLD,
        searchable: true,
        // a text input of type 'email'
        control: 'email',
        viewableBy: ['guests'],
        editableBy: ['guests'],
        insertableBy: ['guests'],
    },
    // customer addresses (a customer can have 1 ore more addresses)
    // TODO: this should generate a form that allow to create one or more
    // addresses (ArrayForm using nested ObjectForm)
    addresses: {
        type: Array,
        label: 'Addresses',
        min: 0,
        // TODO: this should be the default control for array
        // or at least provided in the core libs
        control: ArrayForm, 
        viewableBy: ['guests'],
        editableBy: ['guests'],
        insertableBy: ['guests'],
    },
    'addresses.$': addressFormSchema
}

// fields with $ must be ignored for the moment otherwise 
// Vulcan will try to generate gql for them and fail
schema['addresses.$'].viewableBy = undefined
schema['addresses.$'].editableBy = undefined
schema['addresses.$'].insertableBy = undefined


export default schema;
