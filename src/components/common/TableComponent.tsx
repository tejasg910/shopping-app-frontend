import React from "react";

interface TableProps {
  columns: string[];
  rows: { [key: string]: string | number }[];

  page?: number;
  nextPage?: () => void;
  previousPage?: () => void;
  totalPages?: number;
  actionDetails: {
    handler: (id: string) => void;
    name: string;
  };
}

const TableComponent: React.FC<TableProps> = ({
  columns,
  rows,
  actionDetails,
  page = 1,
  nextPage,
  previousPage,
  totalPages = 1,
}) => {
  console.log(rows, columns, "this is row and columns");
  return (
    <div className="table_component_container">
      <table className="table_component">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column}</th>
            ))}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, columnIndex) => (
                <td key={columnIndex}>{row[column]}</td>
              ))}
              <td>
                <button
                  onClick={() => {
                    actionDetails.handler(row?._id as string);
                  }}
                >
                  {actionDetails.name}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button disabled={page <= 1} onClick={previousPage} className="">
          Previous
        </button>
        {page} of {totalPages}
        <button disabled={page >= totalPages} onClick={nextPage}>
          Next
        </button>
      </div>
    </div>
  );
};

export default TableComponent;
