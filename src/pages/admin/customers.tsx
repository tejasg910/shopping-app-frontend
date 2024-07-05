import { useEffect, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { useGetAllUsersQuery } from "../../redux/api/adminApi";
import { useSelector } from "react-redux";
import { userReducerInitialState } from "../../types/reducer_types";
import { toast } from "react-hot-toast";
import TableComponent from "../../components/common/TableComponent";
import { ListSkeletonLoading } from "../../components/loading";
import { useNavigate } from "react-router-dom";

const userColumns = ["_id", "name", "email", "gender"];

type TableRows = {
  _id: string;
  name: string;
  email: string;
  gender: string;
};
const Customers = () => {
  const { user } = useSelector(
    (state: { userReducer: userReducerInitialState }) => state.userReducer
  );

  const navigate = useNavigate();

  const [rows, setRows] = useState<TableRows[]>([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { data, isError, isLoading } = useGetAllUsersQuery({
    userId: user?._id!,
    page: page,
  });

  console.log(data, "this is data");

  useEffect(() => {
    if (data?.data) {
      const rows = data.data.map((user) => ({
        _id: user._id,
        name: user.name,
        gender: user.gender,
        email: user.email,
      }));

      setRows(rows);
      setPage(data?.currPage);
      setTotalPages(data?.totalPages);
    }
  }, []);

  if (isError) toast.error("Something went wrong while fetching products");
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
          columns={userColumns}
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

export default Customers;
