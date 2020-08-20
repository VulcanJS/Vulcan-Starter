import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter/prism';
import { solarizedlight as theme } from 'react-syntax-highlighter/styles/prism';

// import schema from '../../modules/schema.js';

const schema = `
const schema = {

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

  isWatched: {
    label: 'Watched?',
    type: Boolean,
    optional: true,
    canRead: ['guests'],
    canCreate: ['members'],
    canUpdate: ['members'],
  },

  imdbId: {
    type: String,
    optional: true,
    canRead: ['guests'],
  },

};
`

const Schema = () => (
  <div className="schema">
    <SyntaxHighlighter language="javascript" style={theme}>{schema}</SyntaxHighlighter>
  </div>
);

export default Schema;