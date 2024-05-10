import React, { ReactElement, useEffect, useState } from "react";
import TableHOC from "../components/admin/TableHOC";
import { Column } from "react-table";
import { Link } from "react-router-dom";
import { useMyOrdersQuery } from "../redux/api/userApi";
import { useSelector } from "react-redux";
import { userReducerInitialState } from "../types/reducer_types";
import { toast } from "react-hot-toast";
import { Order } from "../types/api_types";
import { Product, ShippingInfo } from "../types/types";
type DataType = {
  _id: string;
  total: number;
  quantity: number;
  discount: number;
  status: string;
  action?: ReactElement;
  shippingInfo?: ShippingInfo;
  user?: {
    name: string;
    _id: string;
  };
  subTotal?: number;
  shippingCharges?: number;
  product?: Product;
  name?: string;
  tax?: number;
};

const column: Column<DataType>[] = [
  {
    Header: "ID",
    accessor: "_id",
  },
  {
    Header: "Amount",
    accessor: "total",
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
  const { user } = useSelector(
    (state: { userReducer: userReducerInitialState }) => state.userReducer
  );
  const { data, isError, error, isLoading } = useMyOrdersQuery(user?._id!);
  if (isError) return toast.error("Failed to fetch orders");

  const [rows, setRows] = useState<Order[]>([]);

  useEffect(() => {
    if (data?.data) {
      const orderItems = data.data.map((item) => {
        return {
          ...item,
          action: <Link to={`/order/fdsfsdf`}>View</Link>,
        };
      });
      setRows(orderItems);
    }
  }, [data]);
  const Table = TableHOC(
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
