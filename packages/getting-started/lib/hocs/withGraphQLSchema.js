import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const withGraphQLSchema = graphql(gql`
  query SchemaContents{
    SchemaContents
  } 
  `, {
    alias: 'withGraphQLSchema'
  }
);

export default withGraphQLSchema;