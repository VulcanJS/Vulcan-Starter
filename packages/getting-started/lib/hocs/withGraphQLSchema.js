import { graphql } from '@apollo/client/react/hoc';

import gql from 'graphql-tag';

const withGraphQLSchema = graphql(
  gql`
    query SchemaContents {
      SchemaContents
    }
  `,
  {
    alias: 'withGraphQLSchema',
  }
);

export default withGraphQLSchema;
