/*

Addresses do have a schema but do not have their own collection
This is because they are always tied to a specific object,
either a client or a meeting (Aggregation relationship in the UML representation).

*/
import { Components, addGraphQLSchema } from 'meteor/vulcan:core'

// Representation of an address
export const addressSchema = {
    'street': {
        type: String,
        optional: true,
        label: 'Address',
        searchable: true,
    },
    'street2': {
        type: String,
        optional: true,
        label: 'Complement',
        searchable: false
    },
    'accessCodes': {
        type: String,
        optional: true,
        label: `Access code`,
        searchable: false,
    },
    'locality': {
        type: String,
        optional: true,
        label: 'City',
        searchable: true,
    },
    postalCode: {
        type: String,
        optional: true,
        label: 'Postal code',
        searchable: true,
    },
    'region': {
        type: String,
        optional: true,
        label: 'Region',
        searchable: true,
    },
    'country': {
        type: String,
        optional: true,
        label: 'Country',
        searchable: true,
    },
};

// Address field as an object, reusable in other schemas
export const addressFormSchema = {
    address:{
        type: Object,
        label: 'Address',
        blackbox: true, // FIXME without this we would have a validation failure
        form:{
            objectSchema: () => addressSchema,
        },
        control: Components.ObjectForm,
    },
}
/*
TODO: we should be able to write this instead
This would need:
- To allow simpl-schemas as the field type (right now this would fail due to unexpected gql schema generation)
- To use ObjectForm to be the default control for fields with a nested schema
- To handle validation of such fields / gql schema génération

address:{
    type: addressSchema,
    label: 'Address'
}

*/

// address is not a collection so we need to create a schema manually
// @see http://docs.vulcanjs.org/field-resolvers.html#Custom-Types
const addressGqlSchema = `
  type Adress {
    street: String
    street2: String
    accessCodes: String
    locality: String
    postalCode: String
    region: String
    country: String
  }
`;

addGraphQLSchema(addressGqlSchema);

export default addressSchema;
