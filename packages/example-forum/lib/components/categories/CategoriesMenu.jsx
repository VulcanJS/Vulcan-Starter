import { Components, registerComponent, withMulti, Utils, withCurrentUser } from 'meteor/vulcan:core';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Categories } from '../../modules/categories/index.js';
import { withApollo } from 'react-apollo';
import qs from 'qs';

class CategoriesMenu extends PureComponent {
  getQuery = () => {
    return qs.parse(this.props.location.search, { ignoreQueryPrefix: true }) || {};
  };

  /*

  Menu item for the "All Categories" link

  */
  getAllCategoriesItem = () => {
    // eslint-disable-next-line no-unused-vars
    const { cat, ...allCategoriesQuery } = this.getQuery();

    const menuItem = {
      to: { pathname: Utils.getRoutePath('posts.list'), search: qs.stringify(allCategoriesQuery) },
      linkProps: {
        isActive: () => {
          return !this.getQuery().cat;
        },
      },
      labelId: 'categories.all',
    };

    return menuItem;
  };

  /*

  Menu items for categories

  */
  getCategoriesItems = () => {
    const categories = this.props.results || [];

    // check if a category is currently active in the route
    const currentCategory = categories.find(category => category.slug === this.getQuery().cat);

    // decorate categories with active property
    const categoriesItems = categories.map((category, index) => {
      return {
        to: {
          pathname: Utils.getRoutePath('posts.list'),
          search: qs.stringify({ ...this.getQuery(), cat: category.slug }),
        },
        label: category.name,
        linkProps: {
          isActive: () => {
            return currentCategory && currentCategory.slug === category.slug;
          },
        },
      };
    });

    return categoriesItems;
  };

  /*

  Get all menu items

  */
  getMenuItems = () => {
    const menuItems = [this.getAllCategoriesItem(), ...this.getCategoriesItems()];
    return menuItems;
  };

  render() {
    return (
      <div>
        {this.props.loading ? (
          <Components.Loading />
        ) : (
          <Components.Dropdown
            buttonProps={{ variant: 'secondary' }}
            className="categories-list"
            labelId={'categories'}
            id="categories-dropdown"
            menuItems={this.getMenuItems()}
          />
        )}
      </div>
    );
  }
}

CategoriesMenu.propTypes = {
  results: PropTypes.array,
};

const options = {
  collection: Categories,
  fragmentName: 'CategoriesList',
  limit: 0,
  pollInterval: 0,
};

registerComponent({
  name: 'CategoriesMenu',
  component: CategoriesMenu,
  hocs: [withRouter, withApollo, [withMulti, options], withCurrentUser],
});
