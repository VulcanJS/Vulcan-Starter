import React from "react";
import {
  Components,
  registerComponent,
  withCurrentUser
} from "meteor/vulcan:core";
// import './ServiceBlockContainer.css'

// interface IDashboardWidgetContainer
//   extends React.HTMLAttributes<HTMLDivElement> {
//   title?: string
// }

const ServiceBlockContainer = ({ title, serviceblockrows, minslots, serviceBlockUpdate }) => {
  // console.log(serviceblockrows);
  const hasTitle = title && title.length > 0;
  const containerTitle = hasTitle ? title : " ";
  return (
    <div>
      {<div className="Title"> {containerTitle} </div>}
      <div className="ServiceBlockContainer">
        <Components.ServiceBlock
          serviceBlockUpdate={serviceBlockUpdate}
          minslots={minslots}
          title={title}
          dataRows={serviceblockrows}
        />
      </div>
    </div>
  );
};

registerComponent({
  name: "ServiceBlockContainer",
  component: ServiceBlockContainer,
  hocs: [withCurrentUser]
});
