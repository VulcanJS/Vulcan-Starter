import React, { Component } from 'react';
import { registerComponent } from 'meteor/vulcan:core';
import withAuth from '../hocs/withAuth.js';
import Button from 'react-bootstrap/lib/Button';

class Auth extends Component {
  // goTo(route) {
  //   this.props.history.replace(`/${route}`)
  // }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  render() {
    console.log(this.props)
    const { isAuthenticated } = this.props;

    return (
      <div>

        {this.props.userInfo && 
          <ul>
            {Object.keys(this.props.userInfo).map(key =>
              <li key={key}><code>{key}</code>: {this.props.userInfo[key]}</li>
            )}
          </ul>
        }

        {isAuthenticated ?
          <Button bsStyle="primary" className="btn-margin" onClick={this.logout.bind(this)}>
            Log Out
          </Button> : 
          <Button bsStyle="primary" className="btn-margin" onClick={this.login.bind(this)}>
            Log In
          </Button>
        }
      </div>
    );
  }
}

Auth.displayName = 'Auth';

registerComponent('Auth', Auth, withAuth);
