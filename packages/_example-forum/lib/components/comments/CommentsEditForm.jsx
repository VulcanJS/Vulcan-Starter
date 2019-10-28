import { Components, registerComponent, getFragment, withMessages } from 'meteor/vulcan:core';
import React from 'react';
import PropTypes from 'prop-types';
import { Comments } from '../../modules/comments/index.js';

const CommentsEditForm = ({ comment, successCallback, cancelCallback, removeSuccessCallback }) => {
  return (
    <div className="comments-edit-form">
      <Components.SmartForm 
        layout="elementOnly"
        collection={Comments}
        documentId={comment._id}
        successCallback={successCallback}
        cancelCallback={cancelCallback}
        removeSuccessCallback={removeSuccessCallback}
        showRemove={true}
        mutationFragment={getFragment('CommentItem')}
      />
    </div>
  )
}

CommentsEditForm.propTypes = {
  comment: PropTypes.object.isRequired,
  successCallback: PropTypes.func,
  cancelCallback: PropTypes.func
};

registerComponent({ name: 'CommentsEditForm', component: CommentsEditForm, hocs: [withMessages] });
