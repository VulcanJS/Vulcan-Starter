import React from 'react';
import { registerComponent } from 'meteor/vulcan:core';
import SyntaxHighlighter from 'react-syntax-highlighter/prism';
import { okaidia } from 'react-syntax-highlighter/styles/prism';

// import schema from '../../modules/schema.js';

const schema = `
{

  _id: {
    type: String,
    optional: true,
    canRead: ['guests'],
  },

  createdAt: {
    type: Date,
    optional: true,
    canRead: ['guests'],
    onCreate: () => {
      return new Date();
    }
  },

  userId: {
    type: String,
    optional: true,
    canRead: ['guests'],
  },

  name: {
    label: 'Name',
    type: String,
    optional: true,
    canRead: ['guests'],
    canCreate: ['members'],
    canUpdate: ['members'],
    searchable: true,
  },

  review: {
    label: 'Review',
    type: String,
    optional: true,
    input: 'textarea',
    canRead: ['guests'],
    canCreate: ['members'],
    canUpdate: ['members'],
    searchable: true,
  },

}
`

const Schema = () => (
  <div className="schema">
    <SyntaxHighlighter language="javascript" style={okaidia}>{schema}</SyntaxHighlighter>
  </div>
);

registerComponent({ name: 'Schema', component: Schema });
