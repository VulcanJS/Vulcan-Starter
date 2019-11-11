import { registerComponent, Components, Utils } from 'meteor/vulcan:core';
import React, { Component } from 'react';
import { intlShape } from 'meteor/vulcan:i18n';
import { withRouter } from 'react-router';
import qs from 'qs';

// see: http://stackoverflow.com/questions/1909441/jquery-keyup-delay
const delay = (function() {
  var timer = 0;
  return function(callback, ms) {
    clearTimeout(timer);
    timer = setTimeout(callback, ms);
  };
})();

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pathname: props.location.pathname,
      searchValue: this.getQuery().search || '',
    };
  }

  getQuery = () => {
    return qs.parse(this.props.location.search, { ignoreQueryPrefix: true }) || {};
  };

  // note: why do we need this?
  componentWillReceiveProps(nextProps) {
    this.setState({
      searchValue: this.getQuery().search || '',
    });
  }

  handleSearch = e => {
    const searchValue = e.target.value;
    this.setState({ searchValue });

    const { location, history } = this.props;
    const routerQuery = this.getQuery();
    delete routerQuery.search;

    const search = searchValue === '' ? routerQuery : { ...routerQuery, search: searchValue };

    delay(() => {
      // only update the route if the path hasn't changed in the meantime
      if (this.state.pathname === location.pathname) {
        history.push({
          pathname: Utils.getRoutePath('posts.list'),
          search: qs.stringify(search),
        });
      }
    }, 700);
  };

  render() {
    const { history } = this.props;
    const { searchValue } = this.state;
    // eslint-disable-next-line no-unused-vars
    const { search, ...resetQuery } = this.getQuery();

    return (
      <div className="search-form">
        <Components.FormElement>
          <Components.FormComponentText
            inputProperties={{
              name: 'searchQuery',
              value: searchValue,
              placeholder: this.context.intl.formatMessage({ id: 'posts.search' }),
              type: 'text',
              layout: 'elementOnly',
              onChange: this.handleSearch,
            }}
          />
          {this.state.search !== '' ? (
            <button
              className="search-form-reset"
              onClick={(e) => {
                e.preventDefault();
                this.setState({ search: '' });
                history.push({
                  pathname: Utils.getRoutePath('posts.list'),
                  search: qs.stringify(resetQuery),
                });
              }}
            >
              <Components.Icon name="close" />
            </button>
          ) : null}
        </Components.FormElement>
      </div>
    );
  }
}

SearchForm.contextTypes = {
  intl: intlShape,
};

registerComponent({
  name: 'SearchForm',
  component: SearchForm,
  hocs: [withRouter],
});
