import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMyOrdersQuery } from "../redux/api/userApi";
import { useSelector } from "react-redux";
import { userReducerInitialState } from "../types/reducer_types";
import { toast } from "react-hot-toast";
import TableComponent from "../components/common/TableComponent";
import { ListSkeletonLoading } from "../components/loading";

type TableRows = {
  _id: string;
  total: number;
  discount: number;
  status: string;
};

const orderColumns = ["_id", "total", "discount", "status"];

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
    }
  }, [data]);

  return (
    <div className="container">
      <h1>My Orders</h1>

      {/* {Table} */}
      {isLoading ? (
        <ListSkeletonLoading />
      ) : (
        <TableComponent
          actionDetails={{
            handler: (id) => {
              navigate(`/order/${id}`);
            },
            name: "view",
          }}
          columns={orderColumns}
          rows={rows}
        />
      )}
    </div>
  );
};

export default Orders;
