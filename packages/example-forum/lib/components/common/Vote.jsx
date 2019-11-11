import { Components, registerComponent, withMessages, withCurrentUser } from 'meteor/vulcan:core';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withVote, hasVotedClient } from 'meteor/vulcan:voting';
import { FormattedMessage, intlShape } from 'meteor/vulcan:i18n';

class Vote extends PureComponent {
  vote = e => {
    e.preventDefault();
    const { document, collection, currentUser, flash, vote } = this.props;
    if (!currentUser) {
      flash({ id: 'users.please_log_in' });
    } else {
      vote({ document, voteType: 'upvote', collection, currentUser });
    }
  };

  hasVoted = () => hasVotedClient({ document: this.props.document, voteType: 'upvote' });

  render() {
    return (
      <div className={classNames('vote-button', { upvoted: this.hasVoted() })}>
        <a className="upvote-button" onClick={this.vote}>
          <Components.Icon name="upvote" />
          <div className="sr-only">
            <FormattedMessage id="voting.upvote" />
          </div>
          <div className="vote-count">{this.props.document.baseScore || 0}</div>
        </a>
      </div>
    );
  }
}

Vote.propTypes = {
  document: PropTypes.object.isRequired, // the document to upvote
  collection: PropTypes.object.isRequired, // the collection containing the document
  vote: PropTypes.func.isRequired, // mutate function with callback inside
  currentUser: PropTypes.object, // user might not be logged in, so don't make it required
};

Vote.contextTypes = {
  intl: intlShape,
};

registerComponent({ name: 'Vote', component: Vote, hocs: [withMessages, withVote, withCurrentUser] });
