import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const withMoviesCount = graphql(gql`
  query MoviesCount{
    MoviesCount
  } 
  `, {
    alias: 'withMoviesCount',
    options: {
      pollInterval: 5
    },
    props(props) {
      return {
        loading: props.data.loading,
        moviesCount: props.data.MoviesCount,
      }
    }
  }
);

export default withMoviesCount;