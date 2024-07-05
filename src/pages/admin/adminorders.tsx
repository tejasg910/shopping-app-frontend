import { useEffect, useState } from "react";
import { userReducerInitialState } from "../../types/reducer_types";
import { useSelector } from "react-redux";
import { useGetAllOrdersQuery } from "../../redux/api/adminApi";
import { toast } from "react-hot-toast";
import { ListSkeletonLoading } from "../../components/loading";
import TableComponent from "../../components/common/TableComponent";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";
const orderColumns = ["_id", "total", "discount", "status"];
type TableRows = {
  _id: string;
  total: number;
  discount: number;
  status: string;
};
const AdminOrders = () => {
  const navigate = useNavigate();

  const { user } = useSelector(
    (state: { userReducer: userReducerInitialState }) => state.userReducer
  );
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { data, isError, isLoading } = useGetAllOrdersQuery({
    userId: user?._id!,
    page: page,
  });
  if (isError) toast.error("Something went wrong while fetching products");
  const [rows, setRows] = useState<TableRows[]>([]);
  useEffect(() => {
    if (data?.data) {
      console.log(data.data, "this is dataof the orders admin");
      const rows = data.data.map((product) => ({
        _id: product._id,
        total: product.total,
        status: product.status,
        discount: product.discount,
      }));

      setRows(rows);
      setPage(data?.currPage);
      setTotalPages(data?.totalPages);
    }
  }, [data]);

  const previousPageHandler = () => {
    if (page <= 1) {
      return;
    }
    setPage((prev) => prev - 1);
  };

  const nextPageHandler = () => {
    if (page >= totalPages) {
      return;
    }
    setPage((prev) => prev + 1);
  };
  return (
    <div className="admin-container">
      <AdminSidebar />

      {isLoading ? (
        <ListSkeletonLoading />
      ) : (
        <TableComponent
          action={(id) => {
            navigate(`/admin/transaction/${id}`);
          }}
          columns={orderColumns}
          rows={rows}
          page={page}
          previousPage={previousPageHandler}
          nextPage={nextPageHandler}
          totalPages={totalPages}
        />
      )}
    </div>
  );
};

export default AdminOrders;
