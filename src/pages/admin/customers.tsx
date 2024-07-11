import { useEffect, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { useGetAllUsersQuery } from "../../redux/api/adminApi";
import { useSelector } from "react-redux";
import { userReducerInitialState } from "../../types/reducer_types";
import { toast } from "react-hot-toast";
import TableComponent from "../../components/common/TableComponent";
import { ListSkeletonLoading } from "../../components/loading";
import axios from "axios";

const userColumns = ["_id", "name", "email", "role"];

type TableRows = {
  _id: string;
  name: string;
  email: string;
  role: string;
};
const Customers = () => {
  const { user } = useSelector(
    (state: { userReducer: userReducerInitialState }) => state.userReducer
  );

  const [rows, setRows] = useState<TableRows[]>([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { data, isError, isLoading, refetch } = useGetAllUsersQuery({
    userId: user?._id!,
    page: page,
  });

  console.log(data, "this is data");

  useEffect(() => {
    if (data?.data) {
      const rows = data.data.map((user) => ({
        _id: user._id,
        name: user.name,
        role: user.role,
        email: user.email,
      }));

      setRows(rows);
      setPage(data?.currPage);
      setTotalPages(data?.totalPages);
    }
  }, [data]);

  const changeRoleHandler = async (userId: string) => {
    console.log(userId, user?._id);
    // Logic to update email
    try {
      const { data } = await axios.put(
        `${
          import.meta.env.VITE_SERVER
        }/api/v1/admin/user/makeUserAdmin/${userId}?id=${user?._id}`
      );
      console.log(data);

      if (data?.success) {
        refetch();
        toast.success(data?.message);
      }
    } catch (error: any) {
      console.log(error, "this is error");
      toast.error(error?.response?.data?.message);
    }
  };

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
          actionDetails={{ handler: changeRoleHandler, name: "make admin" }}
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
