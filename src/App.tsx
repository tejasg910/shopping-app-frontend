import { Suspense, lazy, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./app.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loading from "./components/loading";
import Header from "./components/header";
import Shipping from "./pages/shipping";
import { Toaster, toast } from "react-hot-toast";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { userExists, userNotExists } from "./redux/reducer/userReducer";
import { getUser } from "./redux/api/userApi";
import { userReducerInitialState } from "./types/reducer_types";
import Loader from "./components/admin/Loader";
import ProtectedRoute from "./components/protected_route";
const Home = lazy(() => import("./pages/home"));
const Orders = lazy(() => import("./pages/orders"));
const Login = lazy(() => import("./pages/login"));
const Search = lazy(() => import("./pages/search"));
const Cart = lazy(() => import("./pages/cart"));
//admin routes importing
const Dashboard = lazy(() => import("./pages/admin/dashboard"));
const Products = lazy(() => import("./pages/admin/products"));
const Customers = lazy(() => import("./pages/admin/customers"));
const Transaction = lazy(() => import("./pages/admin/transaction"));
const Barcharts = lazy(() => import("./pages/admin/charts/barcharts"));
const Piecharts = lazy(() => import("./pages/admin/charts/piecharts"));
const Linecharts = lazy(() => import("./pages/admin/charts/linecharts"));
const Coupon = lazy(() => import("./pages/admin/apps/coupon"));
const Stopwatch = lazy(() => import("./pages/admin/apps/stopwatch"));
const Toss = lazy(() => import("./pages/admin/apps/toss"));
const OrderDetail = lazy(() => import("./pages/orderDetail"));

const NewProduct = lazy(() => import("./pages/admin/management/newproduct"));
const ProductManagement = lazy(
  () => import("./pages/admin/management/productmanagement")
);
const TransactionManagement = lazy(
  () => import("./pages/admin/management/transactionmanagement")
);

const App = () => {
  const { user, loading } = useSelector(
    (state: { userReducer: userReducerInitialState }) => state.userReducer
  );

  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("api hitt in app");
        const response = await getUser(user.uid);
        console.log(response, "this is reponse of login");
        if (response && "data" in response) {
          const user = response.data;
          dispatch(userExists(user));
        } else {
          dispatch(userNotExists());
          toast.error("Something went wrong");
        }
      } else {
        dispatch(userNotExists());
      }
    });
  }, []);
  return loading ? (
    <Loader />
  ) : (
    <Router>
      {/* Header */}
      <Header user={user} />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Search />} path="/search" />
          <Route element={<Cart />} path="/cart" />
          {/* Not logged in route */}
          <Route
            element={
              <ProtectedRoute isAuthenticated={user ? false : true}>
                <Login />
              </ProtectedRoute>
            }
            path="/login"
          />
          {/* login user routes  */}

          <Route
            element={<ProtectedRoute isAuthenticated={user ? true : false} />}
          >
            <Route element={<Shipping />} path="/shipping" />
            <Route element={<Orders />} path="/orders" />
            <Route element={<OrderDetail />} path="/order/:id" />
          </Route>

          {/* admin routes */}
          <Route
            element={
              <ProtectedRoute
                isAuthenticated={user ? true : false}
                adminRoute={true}
                isAdmin={user?.role === "admin" ? true : false}
              />
            }
          >
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/product" element={<Products />} />
            <Route path="/admin/customer" element={<Customers />} />
            <Route path="/admin/transaction" element={<Transaction />} />
            {/* Charts */}
            <Route path="/admin/chart/bar" element={<Barcharts />} />
            <Route path="/admin/chart/pie" element={<Piecharts />} />
            <Route path="/admin/chart/line" element={<Linecharts />} />
            {/* Apps */}
            <Route path="/admin/app/coupon" element={<Coupon />} />
            <Route path="/admin/app/stopwatch" element={<Stopwatch />} />
            <Route path="/admin/app/toss" element={<Toss />} />

            {/* Management */}
            <Route path="/admin/product/new" element={<NewProduct />} />

            <Route path="/admin/product/:id" element={<ProductManagement />} />

            <Route
              path="/admin/transaction/:id"
              element={<TransactionManagement />}
            />
          </Route>
        </Routes>
      </Suspense>
      <Toaster position="bottom-center" />
    </Router>
  );
};

export default App;
