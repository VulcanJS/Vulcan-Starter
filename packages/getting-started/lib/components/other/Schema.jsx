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
    viewableBy: ['guests'],
  },

  createdAt: {
    type: Date,
    optional: true,
    viewableBy: ['guests'],
    onInsert: () => {
      return new Date();
    }
  },

  userId: {
    type: String,
    optional: true,
    viewableBy: ['guests'],
  },

  name: {
    label: 'Name',
    type: String,
    optional: true,
    viewableBy: ['guests'],
    insertableBy: ['members'],
    editableBy: ['members'],
    searchable: true,
  },

  review: {
    label: 'Review',
    type: String,
    optional: true,
    control: 'textarea',
    viewableBy: ['guests'],
    insertableBy: ['members'],
    editableBy: ['members'],
    searchable: true,
  },

}
`

const Schema = () => (
  <div className="schema">
    <SyntaxHighlighter language="javascript" style={okaidia}>{schema}</SyntaxHighlighter>
  </div>
);

registerComponent('Schema', Schema);
