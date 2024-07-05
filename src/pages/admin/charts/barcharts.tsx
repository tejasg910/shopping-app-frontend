import { useSelector } from "react-redux";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { BarChart } from "../../../components/admin/Charts";
import { useGetBarChartDataQuery } from "../../../redux/api/adminApi";
import { userReducerInitialState } from "../../../types/reducer_types";
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
const Barcharts = () => {
  const { user: userData } = useSelector(
    (state: { userReducer: userReducerInitialState }) => state.userReducer
  );
  const {
    data: barChartsData,

  } = useGetBarChartDataQuery(userData?._id!);
  console.log(barChartsData, "this is barCharts data");
  
  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="chart-container">
        <h1>Bar Charts</h1>
        <section>
          <BarChart
            data_2={barChartsData?.data.users!}
            data_1={barChartsData?.data.products!}
            title_1="Products"
            title_2="Users"
            bgColor_1={`hsl(260, 50%, 30%)`}
            bgColor_2={`hsl(360, 90%, 90%)`}
          />
          <h2>Top Products & Top Customers</h2>
        </section>
        <section>
          <BarChart
            horizontal={true}
            data_1={barChartsData?.data.order!}
            data_2={[]}
            title_1="Orders"
            title_2=""
            bgColor_1={`hsl(180, 40%, 50%)`}
            bgColor_2=""
            labels={months}
          />
          <h2>Orders throughout the year</h2>
        </section>
      </main>
    </div>
  );
};
export default Barcharts;
