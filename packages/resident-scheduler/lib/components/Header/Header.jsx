import React from "react";
import Helmet from "react-helmet";
import {
  Components,
  withCurrentUser,
  registerComponent
} from "meteor/vulcan:core";

const Header = () => {
  console.log("****HEADER***************")
  return (
    <div style={{ maxWidth: "1000px", margin: "20px auto" }}>
      {/* First, this is a Helment tag. It's a React package that loads head tags. We're using it to load the Bootstrap stylesheet. 
      This is not Vulcan specific but it is an easy way to add tags to the head... */}
      <Helmet>
        <link
          name="bootstrap"
          rel="stylesheet"
          type="text/css"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
        />
      </Helmet>

      <div
        style={{
          padding: "20px 0",
          marginBottom: "20px",
          borderBottom: "1px solid #ccc"
        }}
      >
       <Components.AccountsLoginForm />
      </div>
    </div>
  );
};

registerComponent({
  name: "Header",
  component: Header,
  hocs: []
});
