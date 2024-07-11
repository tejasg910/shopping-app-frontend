import { BiMaleFemale } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { FaRegBell } from "react-icons/fa";
import { HiTrendingDown, HiTrendingUp } from "react-icons/hi";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { BarChart, DoughnutChart } from "../../components/admin/Charts";
import { useGetStatiSticsQuery } from "../../redux/api/adminApi";
import toast from "react-hot-toast";
import { userReducerInitialState } from "../../types/reducer_types";
import { useSelector } from "react-redux";
const userImg =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp";

const Dashboard = () => {
  const { user: userData } = useSelector(
    (state: { userReducer: userReducerInitialState }) => state.userReducer
  );
  const { data: statisticsData, isError } = useGetStatiSticsQuery(
    userData?._id!
  );

  console.log(userData, "this isuser");

  console.log(statisticsData, "this is data");
  if (isError) toast.error("Error while fetching statics");
  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="dashboard">
        {/* <div className="bar">
          <BsSearch />
          <input type="text" placeholder="Search for data, users, docs" />
          <FaRegBell />
          <img src={userImg} alt="User" />
        </div> */}

        <section className="widget-container">
          <WidgetItem
            percent={statisticsData?.data.percent.revenue! || 0}
            amount={true}
            value={statisticsData?.data.revenue! || 0}
            heading={"revenue"}
            color="rgb(0, 115, 255)"
          />
          <WidgetItem
            percent={statisticsData?.data.percent.user! || 0}
            value={statisticsData?.data.count.user! || 0}
            color="rgb(0 198 202)"
            heading="Users"
          />
          <WidgetItem
            percent={statisticsData?.data.percent.order! || 0}
            value={statisticsData?.data.count.order! || 0}
            color="rgb(255 196 0)"
            heading="Orders"
          />

          <WidgetItem
            percent={statisticsData?.data.percent.product! || 0}
            value={statisticsData?.data.count.product! || 0}
            color="rgb(76 0 255)"
            heading="Products"
          />
        </section>

        <section className="graph-container">
          <div className="revenue-chart">
            <h2>Revenue & Transaction</h2>
            <BarChart
              data_2={statisticsData?.data.chart.revenue || [0, 0, 0, 0, 0, 0]}
              data_1={statisticsData?.data.chart.order || [0, 0, 0, 0, 0, 0]}
              title_1="Revenue"
              title_2="Transaction"
              bgColor_1="rgb(0, 115, 255)"
              bgColor_2="rgba(53, 162, 235, 0.8)"
            />
          </div>

          <div className="dashboard-categories">
            <h2>Inventory</h2>

            <div>
              {statisticsData?.data.allCategories.map((i, index) => {
                const [key, value] = Object.entries(i)[0];
                return (
                  <CategoryItem
                    key={index}
                    value={Number(value)}
                    heading={key}
                    color={`hsl(${Number(value) * 4}, ${value}%, 50%)`}
                  />
                );
              })}
            </div>
          </div>
        </section>

        <section className="transaction-container">
          <div className="gender-chart">
            <h2>Gender Ratio</h2>
            <DoughnutChart
              labels={["Female", "Male"]}
              data={[
                Number(statisticsData?.data.genderRatio.female),
                Number(statisticsData?.data.genderRatio.male),
              ]}
              backgroundColor={[
                "hsl(340, 82%, 56%)",
                "rgba(53, 162, 235, 0.8)",
              ]}
              cutout={90}
            />
            <p>
              <BiMaleFemale />
            </p>
          </div>
          {/* <Table data={statisticsData?.data.transactions! } /> */}
        </section>
      </main>
    </div>
  );
};

interface WidgetItemProps {
  heading: string;
  value: number;
  percent: number;
  color: string;
  amount?: boolean;
}

const WidgetItem = ({
  heading,
  value,
  percent,
  color,
  amount = false,
}: WidgetItemProps) => (
  <article className="widget">
    <div className="widget-info">
      <p>{heading}</p>
      <h4>{amount ? `₹${value}` : value}</h4>
      {percent > 0 ? (
        <span className="green">
          <HiTrendingUp /> +{percent}%{" "}
        </span>
      ) : (
        <span className="red">
          <HiTrendingDown /> {percent}%{" "}
        </span>
      )}
    </div>

    <div
      className="widget-circle"
      style={{
        background: `conic-gradient(
        ${color} ${(Math.abs(percent) / 100) * 360}deg,
        rgb(255, 255, 255) 0
      )`,
      }}
    >
      <span
        style={{
          color,
        }}
      >
        {percent}%
      </span>
    </div>
  </article>
);

interface CategoryItemProps {
  color: string;
  value: number;
  heading: string;
}

const CategoryItem = ({ color, value, heading }: CategoryItemProps) => (
  <div className="category-item">
    <h5>{heading}</h5>
    <div>
      <div
        style={{
          backgroundColor: color,
          width: `${value}%`,
        }}
      ></div>
    </div>
    <span>{value}%</span>
  </div>
);

export default Dashboard;
