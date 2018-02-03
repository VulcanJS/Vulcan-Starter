import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const withMutationResolvers = component => {
  
  return graphql(gql`
    query MutationResolvers{
      __type(name:"Mutation") {
        fields {
          name
        }
      }
    }
    `, {
      alias: 'withMutationResolvers',
      props(props) {
        return {
          loading: props.data.loading,
          mutations: props.data.__type,
        }
      }
    }
  )(component);
};

export default withMutationResolvers;