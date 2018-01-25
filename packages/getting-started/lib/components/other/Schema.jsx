import React from 'react';
import { registerComponent } from 'meteor/vulcan:core';
import SyntaxHighlighter from 'react-syntax-highlighter/prism';
import { okaidia } from 'react-syntax-highlighter/styles/prism';

import schema from '../../modules/schema.js';

const Schema = () => (
  <div className="schema">
    <SyntaxHighlighter language="javascript" style={okaidia}>{JSON.stringify(schema, null, 2)}</SyntaxHighlighter>
  </div>
);

registerComponent('Schema', Schema);
