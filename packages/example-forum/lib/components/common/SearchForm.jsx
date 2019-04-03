import { registerComponent, Components, Utils } from 'meteor/vulcan:core';
import React, { Component } from 'react';
import { intlShape } from 'meteor/vulcan:i18n';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import queryString from 'querystring';


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
    this.search = this.search.bind(this);
    this.state = {
      pathname: props.location.pathname,
      search: this.getQuery().query || ''
    };
  }

  getQuery = () => {
    return  queryString.parse(this.props.location.search);
  }

  // note: why do we need this?
  componentWillReceiveProps(nextProps) {
    this.setState({
      search: this.getQuery().query || ''
    });
  }

  search(e) {
    const value = e.target.value;
    const router = this.props.router;
    const routerQuery = this.getQuery();
    delete routerQuery.query;

    const query = value === '' ? routerQuery : { ...routerQuery, query: value };
    this.setState({ search: value });

    delay(() => {
      // only update the route if the path hasn't changed in the meantime
      if (this.state.pathname === router.location.pathname) {
        router.push({
          pathname: Utils.getRoutePath('posts.list'),
          query,
        });
      }
    }, 700);
  }

  render() {
    const resetQuery = this.getQuery();
    delete resetQuery.query;

    return (
      <div className="search-form">
        <Components.FormElement>
          <Components.FormComponentText
            inputProperties={{
              name: 'searchQuery',
              value: this.state.search,
              placeholder: this.context.intl.formatMessage({ id: 'posts.search' }),
              type: 'text',
              layout: 'elementOnly',
              onChange: this.search,
            }}
          />
          {this.state.search !== '' ? (
            <Link className="search-form-reset" to={{ pathname: '/', query: resetQuery }}>
              <Components.Icon name="close" />
            </Link>
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
  hocs: [withRouter]
});
