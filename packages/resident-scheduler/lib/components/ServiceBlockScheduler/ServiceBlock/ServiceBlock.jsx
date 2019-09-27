import React from "react";
import {
  Components,
  registerComponent,
  withCurrentUser
} from "meteor/vulcan:core";
//import combineClasses from 'combine-classes/lib'
// import './ServiceBlock.css'
import Table from "./Table/Table";
// import { ITable } from '../../../../../common/types'

// export interface ITable {
//   columnNames: string[]
//   dataRows: any[]
//   title: string
// }

// export interface IGenericTableProps
//   extends React.HTMLAttributes<HTMLDivElement> {
//   table: ITable
// }

const ServiceBlock = props => {
  const { dataRows, title, minslots=3, serviceBlockUpdate} = props;
  const dataRowsExist = dataRows && dataRows.length > 0;
  let columnNames = [];
  if (dataRowsExist) columnNames = Object.keys(dataRows[0]);
  // console.log(columnNames)
  return dataRowsExist ? (
    <div
      title={title}
      className="ServiceBlock"
    >
      <Components.Table selectionUpdate={serviceBlockUpdate} minslots={minslots} columnNames={columnNames} dataRows={dataRows} />
    </div>
  )
  :
  null
};

registerComponent({
  name: "ServiceBlock",
  component: ServiceBlock,
  hocs: [withCurrentUser]
});
