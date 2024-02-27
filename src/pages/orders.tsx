import React, { ReactElement, useState } from "react";
import TableHOC from "../components/admin/TableHOC";
import { Column } from "react-table";
import { Link } from "react-router-dom";
type DataType = {
  _id: string;
  amount: number;
  quantity: number;
  discount: number;
  status: ReactElement;
  action: ReactElement;
};

const column: Column<DataType>[] = [
  {
    Header: "ID",
    accessor: "_id",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Qantity",
    accessor: "quantity",
  },
  {
    Header: "Discount",
    accessor: "discount",
  },

  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];
const Orders = () => {
  const [rows, setRows] = useState<DataType[]>([
    {
      _id: "fdsfsdf",
      amount: 5000,
      quantity: 20,
      discount: 400,
      status: <span className="red">Processing</span>,
      action: <Link to={`/order/fdsfsdf`}>View</Link>,
    },
  ]);
  const Table = TableHOC<DataType>(
    column,
    rows,
    "dashboard-product-box",
    "Orders",
    true
  )();
  return (
    <div className="container">
      <h1>My Orders</h1>

      {Table}
    </div>
  );
};

export default Orders;
