import React, { useState } from "react";
import {
  Components,
  registerComponent,
  withCurrentUser
} from "meteor/vulcan:core";
// import './ResidentsListItem.css'

// interface IDashboardWidgetContainer
//   extends React.HTMLAttributes<HTMLDivElement> {
//   title: string
// }

const ResidentSelector = ({
  resident,
  serviceBlockUpdate,
  row,
  col,
  selectionUpdate
}) => {
  const restorePrevResident = () => {
    alert("Called restored");
  };
  const [currentResident, setCurrentResident] = useState(resident);
  const [prevResident, setPrevResident] = useState("");
  const setActiveResident = event => {
    event.preventDefault();
    selectionUpdate({
      col: col,
      row: row,
      newValue: event.target.value,
      prevValue: currentResident,
      doCheckFail: restorePrevResident
    });
    setPrevResident(currentResident);
    setCurrentResident(event.target.value);
  };

  return (
    <div className="ResidentSelectorContainer">
      <Components.SelectResident
        value={resident}
        onChange={setActiveResident}
      />
    </div>
  );
};

registerComponent({
  name: "ResidentSelector",
  component: ResidentSelector,
  hocs: [withCurrentUser]
});
