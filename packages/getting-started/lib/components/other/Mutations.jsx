import React from 'react';
import { registerComponent } from 'meteor/vulcan:core';
import withMutationResolvers from '../../hocs/withMutationResolvers';

const Mutations = ({ mutations }) => (
  <div className="mutation-resolvers">
    <ul>
      {mutations &&
        mutations.fields.map(resolver => (
          <li key={resolver.name}>
            {['createMovie', 'updateMovie', 'upsertMovie', 'deleteMovie'].includes(resolver.name) ? (
              <strong>{resolver.name}</strong>
            ) : (
              <span>{resolver.name}</span>
            )}
          </li>
        ))}
    </ul>
  </div>
);

registerComponent({ name: 'Mutations', component: Mutations, hocs: [withMutationResolvers] });
