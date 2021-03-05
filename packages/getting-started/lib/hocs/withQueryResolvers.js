import { graphql } from '@apollo/client/react/hoc';
import gql from 'graphql-tag';

const withQueryResolvers = (component) => {
  return graphql(
    gql`
      query QueryResolvers {
        __type(name: "Query") {
          fields {
            name
          }
        }
      }
    `,
    {
      alias: 'withQueryResolvers',
      props(props) {
        return {
          loading: props.data.loading,
          resolvers: props.data.__type,
        };
      },
    }
  )(component);
};

export default withQueryResolvers;
