import { ReactElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";
import { useSelector } from "react-redux";
import { userReducerInitialState } from "../../types/reducer_types";
import { useGetAllOrdersQuery } from "../../redux/api/adminApi";
import { toast } from "react-hot-toast";
import { SkeletonLoading } from "../../components/loading";

interface DataType {
  user: string;
  amount: number;
  discount: number;
  quantity: number;
  status: ReactElement;
  action: ReactElement;
}

const arr: Array<DataType> = [
  {
    user: "Charas",
    amount: 4500,
    discount: 400,
    status: <span className="red">Processing</span>,
    quantity: 3,
    action: <Link to="/admin/transaction/sajknaskd">Manage</Link>,
  },

  {
    user: "Xavirors",
    amount: 6999,
    discount: 400,
    status: <span className="green">Shipped</span>,
    quantity: 6,
    action: <Link to="/admin/transaction/sajknaskd">Manage</Link>,
  },
  {
    user: "Xavirors",
    amount: 6999,
    discount: 400,
    status: <span className="purple">Delivered</span>,
    quantity: 6,
    action: <Link to="/admin/transaction/sajknaskd">Manage</Link>,
  },
];

const columns: Column<DataType>[] = [
  {
    Header: "Avatar",
    accessor: "user",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Discount",
    accessor: "discount",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
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

const Transaction = () => {
  const { user } = useSelector(
    (state: { userReducer: userReducerInitialState }) => state.userReducer
  );
  const { data, isError, isLoading } = useGetAllOrdersQuery(user?._id!);
  if (isError) toast.error("Something went wrong while fetching products");
  const [rows, setRows] = useState<DataType[]>(arr);
  useEffect(() => {
    if (data)
      setRows(
        data.data.map((i) => ({
          user: i.name,
          amount: i.total,
          status: (
            <button
              style={{
                color:
                  i.status === "shipped"
                    ? "blue"
                    : i.status === "processing"
                    ? "yellow"
                    : i.status === "delivered"
                    ? "green"
                    : "black",
              }}
            >
              {i.status}
            </button>
          ),
          discount: i.discount,
          quantity: i.quantity,
          action: <Link to={`/admin/transaction/${i._id}`}>Manage</Link>,
        }))
      );
  }, [data]);
  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-product-box",
    "Transactions",
    rows.length > 6
  )();
  return (
    <div className="admin-container">
      <AdminSidebar />
      {isLoading ? <SkeletonLoading /> : <main>{Table}</main>}
    </div>
  );
};

export default Transaction;
