import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const withMutationResolvers = graphql(gql`
  query MutationResolvers{
    __type(name:"Mutation") {
      fields {
        name
      }
    }
  }
  `, {
    alias: 'withMutationResolvers'
  }
);

export default withMutationResolvers;