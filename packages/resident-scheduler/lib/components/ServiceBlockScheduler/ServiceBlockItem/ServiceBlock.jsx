import React from 'react'
import {
  Components,
  registerComponent,
  withCurrentUser,
} from "./Table/node_modules/meteor/vulcan:core";
//import combineClasses from 'combine-classes/lib'
// import './ServiceBlock.css'
import Table from './Table/index'
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

const ServiceBlock = ({ table }) => {
  const { columnNames, dataRows, title } = table
  return (
    <div
      title={title}
      // className={combineClasses(className, style.GenericTable)}
      className="ServiceBlockItem"
    >
      <Components.Table columnNames={columnNames} dataRows={dataRows} />
    </div>
  )
}

registerComponent({
  name: "ServiceBlock",
  component: ServiceBlock,
  hocs: [withCurrentUser]
});