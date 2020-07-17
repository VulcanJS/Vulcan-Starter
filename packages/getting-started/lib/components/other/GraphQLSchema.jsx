import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter/prism';
import { solarizedlight as theme } from 'react-syntax-highlighter/styles/prism';

const GraphQLSchema = ({ data }) => (
  <div className="graphql-schema">
    <SyntaxHighlighter language="graphql" style={theme}>
      {data.schemaContents}
    </SyntaxHighlighter>
  </div>
);

export default GraphQLSchema;
