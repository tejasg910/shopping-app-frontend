import { useState } from "react";
import OpenModal from "../components/common/OpenModal";
import { useSelector } from "react-redux";
import { userReducerInitialState } from "../types/reducer_types";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { Order } from "../types/api_types";
import { server } from "../redux/store";
import { DetailSkeletonLoading } from "../components/loading";
import { useOrderDetailQuery } from "../redux/api/commonApi";

const OrderDetail = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { user } = useSelector(
    (state: { userReducer: userReducerInitialState }) => state.userReducer
  );

  const { id } = useParams();
  const { data, isLoading, isError } = useOrderDetailQuery(
    {
      id: user?._id!,
      orderId: id!,
    },
    { refetchOnMountOrArgChange: true, refetchOnReconnect: true }
  );
  const orderDate = new Date(data?.data?.createdAt!);
  console.log(data?.data, "This is data of order");
  if (isError)
    return toast.error("Something went wrong while fetching order details");

  const OpenDialogHandler = () => {
    setIsOpen(true);
  };
  const CloseDialogHandler = () => {
    setIsOpen(false);
  };
  return (
    <div className="main_container_orderDetails">
      {isLoading ? (
        <DetailSkeletonLoading />
      ) : (
        <div
          className="orderDetail"
          style={isOpen ? { opacity: 0.4 } : { opacity: 1 }}
        >
          <div className="order_details_status_container">
            <div className="order_container">
              <div className="row">
                <div className="col-12 col-md-10 hh-grayBox pt45 pb20">
                  <div className="row justify-content-between">
                    <div
                      className={`order-tracking ${
                        data?.data.status === "processing" ||
                        data?.data.status === "shipped" ||
                        data?.data.status === "delivered"
                          ? "completed"
                          : ""
                      } `}
                    >
                      <span className="is-complete"></span>
                      <p>
                        Ordered
                        <br />
                        <span>{orderDate.toLocaleDateString()}</span>
                      </p>
                    </div>
                    <div
                      className={`order-tracking ${
                        data?.data.status === "shipped" ||
                        data?.data.status === "delivered"
                          ? "completed"
                          : ""
                      } `}
                    >
                      <span className="is-complete"></span>
                      <p>
                        Shipped
                        <br />
                        {/* <span>Tue, June 25</span> */}
                      </p>
                    </div>
                    <div
                      className={`order-tracking ${
                        data?.data.status === "delivered" ? "completed" : ""
                      } `}
                    >
                      <span className="is-complete"></span>
                      <p>
                        Delivered
                        <br />
                        {/* <span>Fri, June 28</span> */}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h1 className="heading">Order summary</h1>
          {/* 
        <section className="image_section">
          <img src="/assets/cover.png" alt="" />
        </section>
        <div>
          <p>
            <span>Product Name</span>: BEST SHOPING DESIGN
          </p>

          <p>
            <span>Description</span> : Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Architecto, iure sed! Eaque possimus, nemo
            corporis repellat modi fugit officiis explicabo.
          </p>
          <p>
            <span>Quantity</span>: <b>10</b>
          </p>
          <p>
            <span>SubTotal</span>: <b>$1000</b>
          </p>
        </div> */}

          {data?.data && <OrderDetailComponent data={data?.data!} />}
          <div className="btn_div">
            <button disabled={isOpen} onClick={OpenDialogHandler}></button>
          </div>
        </div>
      )}
      <OpenModal
        cancelButtonName="Cancel"
        isOpen={isOpen}
        onClose={CloseDialogHandler}
        saveButtonName="Confirm"
        onConfirm={()=>{}}
      >
        <div>
          <p>Are you sure to cancel this superb order?</p>
        </div>
      </OpenModal>

      {/* <dialog
        style={isOpen ? { opacity: 1 } : { display: "none" }}
        className="dialog"
        open={isOpen}
      >
        <div>
          <p>Are you sure to cancel this superb order?</p>
          <div>
            <button onClick={CloseDialogHandler}>Yes</button>
            <button onClick={CloseDialogHandler}>Never</button>
          </div>
        </div>
      </dialog> */}
    </div>
  );
};

export default OrderDetail;

const OrderDetailComponent: React.FC<{ data: Order }> = ({ data }) => {
  return (
    <div className="my_order_details">
      <div className="order_details_container">
        <section className="order_id_section">
          <div className="heading_div">
            <h2>{data._id!}</h2>
            <h1>{data.status!}</h1>
          </div>

          <div className="info_div">
            <button> Transation:Cash on delivery</button>
            <button>Order placed: 4 May 2024 </button>
          </div>
        </section>
        <section className="customer_section">
          <div className="personal_info">
            <div className="heading">
              <h1>Customer Info</h1>
            </div>
            <div className="table_container">
              <table>
                <tr>
                  <td>Name:</td>
                  <td>{data.user.name}</td>
                </tr>
                <tr>
                  <td>Email:</td>
                  <td>{data.user?.email}</td>
                </tr>
                <tr>
                  <td>Mobile:</td>
                  <td>{data.user.mobile}</td>
                </tr>
                <tr>
                  <td>Payment Mode:</td>
                  <td>{data.paymentMode}</td>
                </tr>
                <tr>
                  <td>Payment Status:</td>
                  <td>{data.paymentStatus}</td>
                </tr>
              </table>
            </div>
          </div>
          <div className="shipping_address">
            <div className="heading">
              <h1>Shipping Address</h1>
            </div>
            <p>{data.shippingInfo.address}</p>
          </div>
          <div className="billing_address">
            <div className="heading">
              <h1>Billing Address</h1>
            </div>
            <p>
              {data.shippingInfo.address} , {data.shippingInfo.city},{" "}
              {data.shippingInfo.state} , {data.shippingInfo.country},{" "}
              {data.shippingInfo.pinCode}
            </p>
          </div>
        </section>
        <section className="pricing_section">
          <div className="list">
            <div className="heading">
              <h1>Order summary</h1>
            </div>
            <hr />
            <table>
              <tr>
                <td>Image</td>
                <td>Name</td>
                <td>Qantity</td>
                <td>Price</td>
              </tr>
              {data.products.map((product) => {
                return (
                  <tr>
                    <td>
                      <img
                        src={ product.product.image}
                        alt="no image"
                      />
                    </td>
                    <td>{product.product.name}</td>
                    <td>{product.quantity}</td>
                    <td>{product.product.price}</td>
                  </tr>
                );
              })}
            </table>
          </div>
          <div className="pricing">
            <div className="heading">
              <h1>SubTotal</h1>
            </div>
            <table>
              <tr>
                <td>Items</td>

                <td>{data.products.length}</td>
              </tr>
              <tr>
                <td>Shipping</td>

                <td>{data.shippingCharges}</td>
              </tr>
              <tr>
                <td>Tax</td>

                <td>{data.tax}</td>
              </tr>
              <tr>
                <th>Total</th>

                <th>{data.total}</th>
              </tr>
            </table>

            <div className="styler">
              <img src="/assets/ordersanimation.gif" alt="no_image" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
