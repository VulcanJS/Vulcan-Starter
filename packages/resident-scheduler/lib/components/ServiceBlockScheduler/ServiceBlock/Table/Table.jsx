import React from "react";
import {
  Components,
  registerComponent,
  withCurrentUser
} from "meteor/vulcan:core";
// export interface ITableRow {
//   cells: string[]
// }

// interface ITableProps {
//   columnNames: string[]
//   dataRows: ITableRow[]
// }

const Table = props => {
  return (
    <div className="TableContainer">
      A minimum of {props.minslots} residents must be allocated per service
      block row.
      <div className="TableSpacing">
        <table id="table">
          <tbody>
            <tr id="rowHeader">
              {props.columnNames.map((columnName, colIndex, cols) => {
                return <th key={`${colIndex}`}>{columnName.toUpperCase()}</th>;
              })}
            </tr>
            {props.dataRows.map((row, rowIndex, rows) => {
              return (
                <tr key={`${rowIndex}`}>
                  {Object.keys(row).map((key, colIndex) => {
                    return colIndex === 0 ? (
                      <td key={`${colIndex}`}>
                        <a className="day" title={row[key]}>
                          <span>{rowIndex+1}</span>
                        </a>
                      </td>
                    ) : (
                      <td key={`${colIndex}`}>
                        <Components.ResidentSelector row={rowIndex} col={colIndex} selectionUpdate={props.selectionUpdate} resident={row[key]} />
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

registerComponent({
  name: "Table",
  component: Table,
  hocs: [withCurrentUser]
});
