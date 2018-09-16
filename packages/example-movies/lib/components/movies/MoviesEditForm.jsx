/* 

A component to configure the "edit movie" form.

*/

import React from 'react';
import { Components, registerComponent, getFragment } from 'meteor/vulcan:core';

import Movies from '../../modules/movies/collection.js';

const MoviesEditForm = ({ documentId, closeModal, refetch }) => (
  <Components.SmartForm
    collection={Movies}
    documentId={documentId}
    mutationFragment={getFragment('MoviesItemFragment')}
    showRemove={true}
    successCallback={document => {
      refetch();
      closeModal();
    }}
    removeSuccessCallback={document => {
      refetch();
      closeModal();
    }}
  />
);

registerComponent({ name: 'MoviesEditForm', component: MoviesEditForm });
