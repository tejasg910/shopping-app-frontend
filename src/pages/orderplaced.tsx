import  { useEffect } from "react";
import {
 
  useNavigate,
  useSearchParams,
} from "react-router-dom";

const Orderplaced = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Check if the current location is /pay, if not, redirect to the home page
  const referrer = searchParams.get("referrer");
  useEffect(() => {
    console.log(referrer);

    if (referrer !== "/pay") {
      console.log(referrer);
      navigate("/");
    }
  }, []);

  return (
    <div className="order_status_container">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div className="message-box _success">
              <i className="fa fa-check-circle" aria-hidden="true"></i>
              <h2> Your order placed successfully </h2>
              <p>
                {" "}
                Thank you for your payment. we will <br />
                be in contact with more details shortly{" "}
              </p>

              <button
                onClick={() => {
                  navigate("/orders");
                }}
                className="primary_button"
              >
                My Orders
              </button>
              <button
                onClick={() => {
                  navigate("/");
                }}
                className="primary_button"
              >
                Home
              </button>
            </div>
          </div>
        </div>
        {/* <div className="order_status_table">
          <table>
            <tr>
              <th>Name</th>
              <th>Status</th>
            </tr>
            <tr>
              <td>Order id</td>
              <td>fsdfsgsfdsfd</td>
            </tr>
            <tr>
              <td>Products Ordered</td>
              <td>10</td>
            </tr>

            <tr>
              <td>Payment Status</td>
              <td>Succeed</td>
            </tr>
            <tr>
              <td>Total</td>
              <td>200000</td>
            </tr>
          </table>
        </div> */}
      </div>
    </div>
  );
};

export default Orderplaced;
