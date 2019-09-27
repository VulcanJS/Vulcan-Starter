import React, { useState } from "react";
// import './BlockScheduler.css'
import {
  Components,
  registerComponent,
  withCurrentUser
} from "meteor/vulcan:core";

// interface IDashboardWidgetContainer
//   extends React.HTMLAttributes<HTMLDivElement> {
//   title?: string
// }
const mockedServiceBlocks = [...Array(28)].map((_, i) => ({
  day: new Date(2019, 9, i + 1).toString(),
  slot1: "Julia",
  slot2: "Arnold",
  slot3: "Bruce",
  slot4: "user1@4si.com",
  slot5: ""
}));
const minslots = 3;
const notMaxed = resident =>
  resident && resident.allocations < resident.availability;
const incAllocations = resident =>
  resident && (resident.allocations = resident.allocations + 1);
const decAllocations = resident => {
  resident &&
    (resident.allocations = resident.allocations - 1) &&
    (resident.overallocated = false);
};

const mockedResidents = ["Julia", "Arnold", "Bruce", "user1@4si.com"].map(
  resident => ({
    resident: resident,
    allocations: 28,
    availability: 30,
    overallocated: false
  })
);
const ServiceBlockScheduler = ({ children, title }) => {
  const cloneServiceBlocks = serviceBlocks => {
    return serviceBlocks.map(serviceBlock => {
      return Object.keys(serviceBlock).reduce((object, key) => {
        if (key.startsWith("slot")) {
          object[key] = serviceBlock[key];
        }
        return object;
      }, {});
    });
  };
  // console.log("****Cloned Service Blocks");
  // console.log(cloneServiceBlocks(mockedServiceBlocks));
  const [scheduleCache, setScheduleCache] = useState(
    cloneServiceBlocks(mockedServiceBlocks)
  );
  const [residentsList, setResidentsList] = useState(mockedResidents);
  const commit = event => {
    alert("Schedule Commit clicked");
  };
  const cancel = event => {
    alert("Schedule Cancel clicked");
  };

  const udpateResident = (newValue, prevValue) => {
    const updatedResidentsList = Object.assign([], residentsList);
    console.log("*****DEbug*****");
    console.log(newValue);
    console.log(prevValue);
    console.log(residentsList);
    const nr = residentsList.find(resident => resident.resident === newValue);
    const pr = residentsList.find(resident => resident.resident === prevValue);
    incAllocations(nr);
    decAllocations(pr);
    setResidentsList(updatedResidentsList)
  };

  const serviceBlockUpdate = ({
    col,
    row,
    newValue,
    prevValue,
    doCheckFail
  }) => {
    // console.log("***ServiceBlockUpdate*****");
    const localScheduleCache = cloneServiceBlocks(scheduleCache);
    // console.log("***ROW item***");
    // console.log(localScheduleCache[row]);
    // console.log("***ROW/SLOT item***");
    // console.log(localScheduleCache[row][`slot${col}`]);
    col !== undefined &&
    row !== undefined &&
    newValue !== undefined &&
    prevValue !== undefined &&
    localScheduleCache &&
    localScheduleCache[row] &&
    localScheduleCache[row][`slot${col}`] != undefined
      ? (localScheduleCache[row][`slot${col}`] = newValue)
      : console.log(
          `Couldn't update serviceblock cache for {${col}, ${row}, ${newValue}}`
        );
    console.log(localScheduleCache);
    udpateResident(newValue, prevValue);
    setScheduleCache(localScheduleCache);
  };

  // const handleRulesFailure = (resident, doCheckFail) => {
  //   doCheckFail()
  //   const updatedResidentsList = Object.assign([], residentsList)
  //   const res = residentsList.find(residentItem => residentItem.resident === resident)
  //   if (res ) res.overallocated = true
  //   setResidentsList(updatedResidentsList)
  // }
  const hasTitle = title && title.length > 0;
  const containerTitle = hasTitle ? title : " ";
  return (
    <div>
      {<div className="Title"> {containerTitle} </div>}
      <div className="ServiceBlockSchedulerContainer">
        {/* {alert("*****Updates scheduler serviceblock*****")} */}
        {/* Currently the ServiceBlockContainer is being updated every time there's a local state change. 
            This component only needs to be called once when this component is first created. The current
            design is that it is like a store and rules engine for the visualize service block. 
            An alternate design is to use Redux. Currently each service block element is a component that
            couples to a VulcanJS HOC to request the current residents. This might be a little inefficient.
            Perhpas better to pass in the residents once through this component to all serviceblock 
            elements. Then once the scheduler is done scheduling and has hit the APPLY then we use the best
            VulcanJS schema update feature to update all service block items in the database via its 
            GraphQL interface*/}
        <Components.ServiceBlockContainer
          className="ScheduleTable"
          title={title}
          serviceblockrows={mockedServiceBlocks}
          minslots={minslots}
          serviceBlockUpdate={serviceBlockUpdate}
        />
        <Components.ResidentsList
          className="ResidentList"
          residents={residentsList}
        />
      </div>
      <Components.Button
        style={{ height: "40px", width: "100px", margin: "10px" }}
        variant="default"
        onClick={commit}
      >
        {" "}
        Commit{" "}
      </Components.Button>
      <Components.Button
        style={{ height: "40px", width: "100px", margin: "10px" }}
        variant="default"
        onClick={cancel}
      >
        {" "}
        Cancel{" "}
      </Components.Button>
    </div>
  );
};

registerComponent({
  name: "ServiceBlockScheduler",
  component: ServiceBlockScheduler,
  hocs: [withCurrentUser]
});

// UI Changes
// Change SLOT => Shift
// Only render minimum number of shifts and have a + button to do that. 
// Per person per service block change the maximum number (7/9) make it dynamic with + (with title total shifts)

// On left hand side. 
// Have the day of the month displayed. (Month/DOW) e.g. 
// color coding which are weekends. 

// Rules:

// Max shifts.
// Number of weekend calls, Friday/Sunday (and for the whole rest of the service block I can't be allocated another Friday/Sunday)

// Saturday rule is that you can't be allocated more that 1 in the service block.

// Total call number = 1 Saturday and one Fri/Sun + 4-6 weekday shifts 

// Weekend day = Mon-Thurs. 

// Vacation rule: If they're on vacation for 1 week, it will reduce their call by 2. 

// Single source of truth - it's OK to write updates directly to the DB. 
