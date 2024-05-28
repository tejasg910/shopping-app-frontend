import { ReactElement, useEffect, useState } from "react";
import TableHOC from "../components/admin/TableHOC";
import { Column } from "react-table";
import { Link, useNavigate } from "react-router-dom";
import { useMyOrdersQuery } from "../redux/api/userApi";
import { useSelector } from "react-redux";
import { userReducerInitialState } from "../types/reducer_types";
import { toast } from "react-hot-toast";
import { Order } from "../types/api_types";
import { Product, ShippingInfo } from "../types/types";
import TableComponent from "../components/common/TableComponent";
import { ListSkeletonLoading } from "../components/loading";
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
type TableRows = {
  _id: string;
  total: number;
  discount: number;
  status: string;
};

const orderColumns = ["_id", "total", "discount", "status"];

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
  const navigate = useNavigate();
  const { user } = useSelector(
    (state: { userReducer: userReducerInitialState }) => state.userReducer
  );
  const { data, isError, isLoading } = useMyOrdersQuery(user?._id!);
  if (isError) return toast.error("Failed to fetch orders");

  const [rows, setRows] = useState<TableRows[]>([]);

  useEffect(() => {
    if (data?.data) {
      console.log(data.data, "this is dataof the orders");
      const rows = data.data.map((product) => ({
        _id: product._id,
        total: product.total,
        status: product.status,
        discount: product.discount,
      }));

      setRows(rows);
      // const orderItems = data.data.map((item) => {
      //   return {
      //     ...item,
      //     action: <Link to={`/order/fdsfsdf`}>View</Link>,
      //   };
      // });
      // setRows(orderItems);
    }
  }, [data]);
  // const Table = TableHOC(
  //   column,
  //   rows,
  //   "dashboard-product-box",
  //   "Orders",
  //   true
  // )();
  return (
    <div className="container">
      <h1>My Orders</h1>

      {/* {Table} */}
      {isLoading ? (
        <ListSkeletonLoading />
      ) : (
        <TableComponent
          action={(id) => {
            navigate(`/order/${id}`);
          }}
          columns={orderColumns}
          rows={rows}
        />
      )}
    </div>
  );
};

export default Orders;
