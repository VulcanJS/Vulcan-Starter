import { Components, registerComponent, withCurrentUser, withMutation, withMessages } from 'meteor/vulcan:core';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape } from 'meteor/vulcan:i18n';
import Users from 'meteor/vulcan:users';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Newsletter extends PureComponent {
  constructor(props, context) {
    super(props);
    this.subscribeEmail = this.subscribeEmail.bind(this);
    this.successCallbackSubscription = this.successCallbackSubscription.bind(this);
    this.dismissBanner = this.dismissBanner.bind(this);

    this.state = {
      showBanner: false,
      email: '',
    };
  }

  componentDidMount() {
    this.setState({
      showBanner: showBanner(this.props.currentUser),
    });
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.currentUser) {
      this.setState({ showBanner: showBanner(nextProps.currentUser) });
    }
  }

  async subscribeEmail(e) {
    e.preventDefault();
    try {
      const result = await this.props.addEmailNewsletter({ email: this.state.email });
      this.successCallbackSubscription(result);
    } catch (error) {
      const graphQLError = error.graphQLErrors[0];
      console.error(graphQLError); // eslint-disable-line no-console
      this.props.flash({
        id: `newsletter.error_${this.state.error.name}`,
        message: this.state.error.message,
        type: 'error',
      });
    }
  }

  successCallbackSubscription(/* result*/) {
    this.props.flash({ id: 'newsletter.success_message', type: 'success' });
    this.dismissBanner();
  }

  dismissBanner(e) {
    if (e && e.preventDefault) e.preventDefault();

    this.setState({ showBanner: false });

    // set cookie to keep the banner dismissed persistently
    cookies.set('showBanner', 'no');
  }

  renderButton() {
    return (
      <Components.NewsletterButton
        label="newsletter.subscribe"
        mutationName="addUserNewsletter"
        successCallback={() => this.successCallbackSubscription()}
        user={this.props.currentUser}
      />
    );
  }

  renderForm() {
    return (
      <Components.FormElement className="newsletter-form" onSubmit={this.subscribeEmail}>
        <Components.FormComponentText
          inputProperties={{
            name: 'email',
            value: this.state.email,
            placeholder: this.context.intl.formatMessage({ id: 'newsletter.email' }),
            type: 'text',
            layout: 'elementOnly',
            onChange: e => {
              const value = e.target.value;
              this.setState({ email: value });
            }
          }}
        />
        <Components.Button className="newsletter-button" type="submit" variant="primary">
          <FormattedMessage id="newsletter.subscribe" />
        </Components.Button>
      </Components.FormElement>
    );
  }

  render() {
    return this.state.showBanner ? (
      <div className="newsletter">
        <h4 className="newsletter-tagline">
          <FormattedMessage id="newsletter.subscribe_prompt" />
        </h4>
        {this.props.currentUser ? this.renderButton() : this.renderForm()}
        <a onClick={this.dismissBanner} className="newsletter-close">
          <Components.Icon name="close" />
        </a>
      </div>
    ) : null;
  }
}

Newsletter.contextTypes = {
  actions: PropTypes.object,
  intl: intlShape,
};

const mutationOptions = {
  name: 'addEmailNewsletter',
  args: { email: 'String' },
};

function showBanner(user) {
  return (
    // showBanner cookie either doesn't exist or is not set to "no"
    cookies.get('showBanner') !== 'no' &&
    // and user is not subscribed to the newsletter already (setting either DNE or is not set to false)
    !Users.getSetting(user, 'newsletter_subscribeToNewsletter', false)
  );
}

registerComponent({
  name: 'Newsletter',
  component: Newsletter,
  hocs: [withMutation(mutationOptions), withCurrentUser, withMessages],
});
