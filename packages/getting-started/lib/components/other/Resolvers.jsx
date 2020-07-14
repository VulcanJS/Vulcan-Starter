import React from 'react';

const Resolvers = ({ resolvers = [] }) => (
  <div className="query-resolvers">
    <ul>
      {resolvers.map((resolver) => (
        <li key={resolver.name}>
          {['movies', 'movie'].includes(resolver.name) ? (
            <strong>{resolver.name}</strong>
          ) : (
            <span>{resolver.name}</span>
          )}
        </li>
      ))}
    </ul>
  </div>
);

export default Resolvers;
