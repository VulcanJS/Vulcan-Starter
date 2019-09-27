import React from 'react'
import {
  Components,
  registerComponent,
  withCurrentUser,
} from "meteor/vulcan:core";
// import './ResidentsListItem.css'

// interface IDashboardWidgetContainer
//   extends React.HTMLAttributes<HTMLDivElement> {
//   title: string
// }

const ResidentsListItem = (props) => {
  console.log('***ResidentsListItem****')
  console.log(props)
  const {allocations, availability, resident} = props.residentState
  return (
    <div className= {allocations >= availability ? "ResidentsListItemContainerWarning" : className="ResidentsListItemContainer"} >
        <div className="IDPadding">{resident}</div>
        <div>{` (${allocations}/${availability})`}</div>
    </div>
  )
}

registerComponent({
  name: "ResidentsListItem",
  component: ResidentsListItem,
  hocs: [withCurrentUser]
});