/*

A SimpleSchema-compatible JSON schema for prospects

*/
import { Components } from 'meteor/vulcan:core'
import { addressFormSchema } from '../address'
import Customers from '../customers/collection'

// copy the address form schema and tweak it a little to match our current needs
// address is optional (default is the client address)
const meetingAddressFormSchema = { 
    ...addressFormSchema,
    optional: true,
 }


const schema = {
    _id: {
        type: String,
        optional: true,
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
    // the meeting date
    date: {
        type: Date,
        optional: false,
        control: 'datetime',
        form: {
            locale: 'fr',
            closeOnSelect: true,
        },
    },
    // Who created the doc. This field is necessary for Vulcan to handle ownership
    // correctly when setting the permissions
    // Here we also use it to know who must meet the client
    userId: {
        type: String,
        hidden: true,
        optional: true,
        onInsert(document, currentUser){
            document.userId = currentUser._id
        },
    },
    // we allow to select a customer
    customerId: {
        type: String,
        optional: true,
        label: 'Client',
        // find the user given its id
        resolveAs: {
            fieldName: 'customer',
            type: 'Customer',
            resolver(meeting, args, context) {
                return context.Customers.findOne(
                    { _id: meeting.customerId },
                    { fields: context.Users.getViewableFields(context.currentUser, context.Customers) }
                );
            },
            addOriginalField: true
        },
        // we use a custom Select with autocompletion
        control: Components.DataSelectForm,
        form: {
            // TODO: we should be able to write (context) => context.Customers instead
            collection: Customers,
            multiple: false,
            labelKey: 'name',
            valueKey: '_id'
        }
    },
    address: meetingAddressFormSchema,
}



export default schema;
