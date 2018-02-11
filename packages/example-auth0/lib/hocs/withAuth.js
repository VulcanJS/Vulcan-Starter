import Auth from '../modules/auth.js';
import React, { Component } from 'react';

const stub = {
  isAuthenticated: () => false
}

const auth = Meteor.isServer ? stub : new Auth();

const withAuth = WrappedComponent => {
  
  class InnerComponent extends Component {
    
    constructor() {
      super();
      this.state = {
        userInfo: null,
        isAuthenticated: auth.isAuthenticated(),
      }
    }

    async componentDidMount() {
      const userInfo = await auth.getUserInfo();
      this.setState({ userInfo });
    }

    render() {
      return <WrappedComponent auth={auth} userInfo={this.state.userInfo} isAuthenticated={this.state.isAuthenticated}/>
    }
  }

  InnerComponent.displayName = `withAuth(${WrappedComponent.displayName})`;

  return InnerComponent;
};

export default withAuth;