import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const withQueryResolvers = component => {
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
