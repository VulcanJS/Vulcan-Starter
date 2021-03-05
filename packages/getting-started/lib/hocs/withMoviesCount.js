import { graphql } from '@apollo/client/react/hoc';

import gql from 'graphql-tag';

const withMoviesCount = (component) => {
  return graphql(
    gql`
      query MoviesCount {
        MoviesCount
      }
    `,
    {
      alias: 'withMoviesCount',
      options: {
        pollInterval: 2000,
      },
      props(props) {
        return {
          loading: props.data.loading,
          moviesCount: props.data.MoviesCount,
        };
      },
    }
  )(component);
};

export default withMoviesCount;
