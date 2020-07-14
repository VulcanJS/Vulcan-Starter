import React from 'react';

const Queries = ({ queries = [] }) => (
  <div className="query-resolvers">
    <ul>
      {queries.map((resolver) => (
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

export default Queries;
