import { Components, registerComponent } from 'meteor/vulcan:core';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { LinkContainer } from 'react-router-bootstrap';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import { withRouter } from 'react-router';
import { Categories } from '../../modules/categories/index.js';

const Category = ({ category, index, router, currentUser }) => {
    const canEdit = Categories.options.mutations.edit.check(currentUser, category);

    // const currentQuery = router.location.query;
    const currentCategorySlug = router.location.query.cat;
    const newQuery = _.clone(router.location.query);
    newQuery.cat = category.slug;

    return (
      <div className="category-menu-item dropdown-item">
        <LinkContainer to={{ pathname: '/', query: newQuery }}>
          <MenuItem eventKey={index + 1} key={category._id}>
            {currentCategorySlug === category.slug ? <Components.Icon name="voted" /> : null}
            {category.name}
          </MenuItem>
        </LinkContainer>
        {canEdit && <Components.EditButton documentId={category._id} collection={Categories} />}
      </div>
    );
  }


Category.propTypes = {
  category: PropTypes.object,
  index: PropTypes.number,
  currentCategorySlug: PropTypes.string,
  openModal: PropTypes.func,
};

registerComponent('Category', Category, withRouter);
