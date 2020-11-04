import React from 'react';
import { Components, registerComponent, withCurrentUser } from 'meteor/vulcan:core';
import { NavLink } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

import withQueryResolvers from '../../hocs/withQueryResolvers.js';
import withMutationResolvers from '../../hocs/withMutationResolvers.js';

const query = gql`
  query steps {
    steps {
      step
      title
      completed
      progress
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
        {data &&
          data.steps.map((props) => {
            const { step } = props;
            return (
              <li className="nav-item" key={step}>
                {canAccess(step) ? (
                  <NavLink className="step-link" activeClassName="active" exact={true} to={step === 0 ? '/' : `/step/${step}`}>
                    <StepLink {...props} />
                  </NavLink>
                ) : (
                  <StepLink {...props} />
                )}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

const StepLink = ({ step, title, completed, progress }) => (
  <span className="step-label">
    {step > 0 && `${step}. `}
    {title}
    <span className="step-progress">
      {progress.map((isCompleted, i) => (
        <span className={`step-check step-check-${isCompleted ? 'complete' : 'incomplete'}`} key={i}>
          ✓
        </span>
      ))}
    </span>
  </span>
);

registerComponent({
  name: 'Nav',
  component: Nav,
  hocs: [withQueryResolvers, withCurrentUser, withMutationResolvers],
});

export default Nav;
