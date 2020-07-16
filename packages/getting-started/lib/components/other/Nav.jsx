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

  return (
    <div className="nav">
      <ul>
        {data.steps.map(({ step, title, completed }) => {
          // activate this step's link if previous step has been completed
          const previousStep = data.steps.find((s) => s.step === step - 1) || { completed: true };
          const { completed: previousStepCompleted } = previousStep;
          return (
            <li className="nav-item" key={step}>
              {previousStepCompleted ? (
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
