import React from 'react'
import {
  Components,
  registerComponent,
  withCurrentUser,
} from "meteor/vulcan:core";
// import './ResidentsList.css'
import ResidentsListItem from './ResidentsListItem/ResidentsListItem';

// interface IDashboardWidgetContainer
//   extends React.HTMLAttributes<HTMLDivElement> {
//   residents: string[] // names of residents
// }

const ResidentsList = ({
  residents
}) => {
  // console.log("RESIDENTS*****")
  // console.log(residents)
  return (
    <div className="ResidentsListContainer">
      {residents.map((resident, index) => {
        return <ul key={index}><Components.ResidentsListItem residentState={resident}  /></ul>
      })}
    </div>
  )
}

registerComponent({
  name: "ResidentsList",
  component: ResidentsList,
  hocs: [withCurrentUser]
});