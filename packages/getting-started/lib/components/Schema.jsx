import React from 'react';
import { registerComponent } from 'meteor/vulcan:core';
import checks from '../modules/checks';
import { Link } from 'react-router';
import ReactMarkdown from 'react-markdown';
import schema from '../modules/schema.js';

const Schema = ({}) => (
  <div className="schema">
    <pre>
      <code>{JSON.stringify(schema, null, 2)}</code>
    </pre>
  </div>
);

registerComponent('Schema', Schema);
