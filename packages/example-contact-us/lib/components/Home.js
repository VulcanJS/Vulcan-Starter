import React from 'react';
import { Components, withList, registerComponent } from 'meteor/vulcan:core';
import ContactUsForm from '../modules/contact-us/collection.js';


const ContactUs = ({
  results = [],
  currentUser,
  loading,
  loadMore,
  count,
  totalCount,
}) => (
  <div style={{ maxWidth: '980px', width: '95vw', margin: '20px auto', fontFamily: 'Verdana, Geneva, sans-serif'}}>
    <h1 style={{ textAlign: 'center'}} >CONTACT US FORM - EXAMPLE PACKAGE</h1>
    <hr/>
    <h3>This package shows how you easily can implement a 'contact us' form in your app.</h3>
    <br/>

    <h3>Configuring email addresses</h3>
    <p>In <code>sample_settings.json</code>, you can edit the defaultEmail setting.</p>
    <p>The "defaultEmail" setting is used as the address to <i>send</i> emails from.</p>
    <p>When the submit button is pressed, Vulcan sends two emails: one to the address from the 'Your email' input and one to the 'site admin'.</p>
    <p>This makes it easy to organise and answer to submissions with your email client.</p>
    <p>The 'site admin' email can be changed by editing the string inside <code>/lib/server/callbacks/contactUsEmail.js</code> on line 24.</p>
    <p>If you want to configure how the email subject is formatted, you can edit it in the email package in the email.js file.</p>
    <p>To add a name when sending and receiving emails, write the name followed by the email wrapped in '&lt;' and '&gt;':</p>
    <p><code>"My Name &lt;site-admin@email.com&gt;"</code></p>
    <br/>

    <h3>Sending real emails</h3>
    <i>This section is made for Mailgun but should be generally applicable. It doesn't go into details on how to register a custom domain. Before you send real emails, please make sure you have an SMTP server or a service like Mailgun ready.</i>
    <br/>
    <p>In <code>sample_settings.json</code>, you have to edit the "mailUrl" setting to fit your credentials.</p>
    <p>That last part ':587' is the port and stays unchanged unless you know it has to be changed.</p>
    <p>To enable emails in development mode, you need to create and set the "developmentEmails" option to true in <code>sample_settings.json</code></p>
    <p>If you want to use your own domain with Mailgun:</p>
    <p>Sign up and get automatic validation my registering a card with them. This is to avoid spam bots etc.</p>
    <p>Register your custom domain by following the instruction, e.g. setting the respective TXT and MX records on the same server your domain's A record is.</p>
    <p>Please note that DNS propagation takes some time. Lowering TTL on records can speed things up but is a bad practice if you don't change them back once you've got things working.</p>
    <hr/>
    {/*
      * Load the 'contact us' SmartForm no matter what and
      * display the latest submissions beneath the form
      *
      */}
    <h2>Get in contact</h2>
    <Components.SmartForm collection={ContactUsForm} />
    {loading ? (
      <Components.Loading />
    ) : (
      <div>

        {results.map(userSubmission => (
          <Components.Card
            key={userSubmission._id}
            collection={ContactUsForm}
            document={userSubmission}
            currentUser={currentUser}
          />
        ))}

        {totalCount > results.length ? (
          <a
            href="#"
            onClick={e => {
              e.preventDefault();
              loadMore();
            }}
          >
            Load More ({count}/{totalCount})
          </a>
        ) : (
          <p>No more items.</p>
        )}
      </div>
    )}
  </div>
);

const options = {
  collection: ContactUsForm,
  limit: 10,
};

registerComponent('ContactUs', ContactUs, [withList, options]);
