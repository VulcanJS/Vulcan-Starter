import React from 'react';
import { Components, registerComponent, withCurrentUser } from 'meteor/vulcan:core';
import { NavLink } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import withQueryResolvers from '../../hocs/withQueryResolvers.js';
import withMutationResolvers from '../../hocs/withMutationResolvers.js';

const query = gql`
  query steps {
    steps {
      step
      title
      completed
    }
  }
`;

const Nav = () => {
  const { loading, data } = useQuery(query);

  if (loading) {
    return <Components.Loading />;
  }

  // a step can be accessed if every step before it is completed
  // note: step 0 can always be accessed
  const canAccess = (step) => (step === 0 ? true : data.steps.slice(0, step).every((s) => s.completed));

  return (
    <div className="nav">
      <ul>
        {data.steps.map(({ step, title, completed }) => {
          return (
            <li className="nav-item" key={step}>
              {canAccess(step) ? (
                <NavLink activeClassName="active" to={`/step/${step}`}>
                  <StepLink step={step} title={title} completed={completed} />
                </NavLink>
              ) : (
                <StepLink step={step} title={title} completed={completed} />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const StepLink = ({ step, title, completed }) => (
  <span>
    {step > 0 && `${step}. `}
    {title}
    {completed && ' ✓'}
  </span>
);

registerComponent({
  name: 'Nav',
  component: Nav,
  hocs: [withQueryResolvers, withCurrentUser, withMutationResolvers],
});

export default Nav;
