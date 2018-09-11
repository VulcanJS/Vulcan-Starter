import React from 'react';
import { Components, registerComponent, withCurrentUser } from 'meteor/vulcan:core';
import { Link } from 'react-router';
import ReactMarkdown from 'react-markdown';
// import SyntaxHighlighter from 'react-syntax-highlighter';
// import { docco } from 'react-syntax-highlighter/styles/hljs';

import SyntaxHighlighter from 'react-syntax-highlighter/prism';
import { okaidia } from 'react-syntax-highlighter/styles/prism';

import checks from '../../modules/checks';
import sections from '../../modules/sections.js';

const isCode = t => t.slice(0, 3) === '~~~';
const languages = {
  js: 'jsx',
  gq: 'graphql',
  sh: 'powershell',
};

// see https://github.com/rexxars/react-markdown-examples/blob/master/examples/custom-renderers/link-renderer.js
const LinkRenderer = props => 
  props.href.match(/^(https?:)?\/\//) ?
    <a href={props.href} target="_blank">{props.children}</a> :
    <Link to={props.href}>{props.children}</Link>

const TextBlocks = ({ textArray, currentUser }) => (
  <div className="text-blocks">
    {textArray.map((block, i) => {
      let text;
      if (typeof block === 'object') {
        // if block is an object, use its check function to decide whether to show block or not
        if (!block.check(currentUser)) {
          return null;
        }
        text = block.text;
      } else {
        text = block;
      }

      // if current user is logged in, add some personalization
      if (currentUser) {
        text = text.replace('##currentUserId##', currentUser._id);
        text = text.replace('##currentUserName##', currentUser.displayName);
      }

      const trimmed = text.trim();
      const language = languages[trimmed.slice(3, 5)] || 'javascript';
      const code = trimmed.slice(5, trimmed.length - 3).trim();

      return isCode(trimmed) ? (
        <div className="code-block" key={i}>
          <SyntaxHighlighter language={language} style={okaidia}>
            {code}
          </SyntaxHighlighter>
        </div>
      ) : (
        <div className="text-block" key={i}>
          <ReactMarkdown source={text} renderers={{ link: LinkRenderer }} />
        </div>
      );
    })}
  </div>
);

const Step = props => {
  const { step, text, after, children, firstStep = false, currentUser } = props;

  const textArray = Array.isArray(text) ? text : [text];
  const afterArray = Array.isArray(after) ? after : [after];

  const buttonText = firstStep ? `Let's get started!` : `Move on to Step ${step + 1}`;

  return (
    <div className="step">
      <div className="step-text">
        <h2>
          {step > 0 && `${step}. `}
          {sections[step]}
        </h2>
        <TextBlocks textArray={textArray} currentUser={currentUser} />
      </div>

      {children && <div className="step-contents">{children}</div>}

      {checks[`step${step}`](props) && (
        <div className="step-done">
          {after && (
            <div className="step-after">
              <TextBlocks textArray={afterArray} currentUser={currentUser} />
            </div>
          )}

          <div className="step-next">
            <Link className="btn btn-primary" to={`/step/${step + 1}`}>
              {buttonText}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

registerComponent({ name: 'Step', component: Step, hocs: [withCurrentUser] });
