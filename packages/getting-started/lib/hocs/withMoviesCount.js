import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const withMoviesCount = graphql(gql`
  query MoviesCount{
    MoviesCount
  } 
  `, {
    alias: 'withMoviesCount'
  }
);

export default withMoviesCount;