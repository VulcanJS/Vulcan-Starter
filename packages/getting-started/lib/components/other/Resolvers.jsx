import React from 'react';
import { registerComponent } from 'meteor/vulcan:core';
import withQueryResolvers from '../../hocs/withQueryResolvers.js';

const Resolvers = ({ resolvers }) => (
  <div className="query-resolvers">
    <ul>
      {resolvers &&
        resolvers.fields.map(resolver => (
          <li key={resolver.name}>
            {['MoviesList', 'MoviesSingle', 'MoviesTotal'].includes(resolver.name) ? (
              <strong>{resolver.name}</strong>
            ) : (
              <span>{resolver.name}</span>
            )}
          </li>
        ))}
    </ul>
  </div>
);

registerComponent({ name: 'Resolvers', component: Resolvers, hocs: [withQueryResolvers] });
