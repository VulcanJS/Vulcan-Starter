import React from 'react';

const Mutations = ({ mutations = [] }) => (
  <div className="mutation-resolvers">
    <ul>
      {mutations.map((resolver) => (
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

export default Mutations;
