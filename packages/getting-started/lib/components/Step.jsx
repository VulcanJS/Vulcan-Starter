import React from 'react';
import { registerComponent } from 'meteor/vulcan:core';
import checks from '../modules/checks';
import { Link } from 'react-router';
import ReactMarkdown from 'react-markdown';

const Step = (props) => {

  const { step, text, after, children } = props;

  return (
    <div className="step">
      <div className="step-text">
        <ReactMarkdown source={text} />
      </div>

      <div className="step-contents">{children}</div>

      {checks[`step${step}`](props) && (
        <div className="step-done">
          {after && (
            <div className="step-after">
              <ReactMarkdown source={after} />
            </div>
          )}

          <div className="step-next">
            You can now <Link to={`/step/${step + 1}`}>move on to Step {step + 1}</Link>.
          </div>
        </div>
      )}
    </div>
)};

registerComponent('Step', Step);
