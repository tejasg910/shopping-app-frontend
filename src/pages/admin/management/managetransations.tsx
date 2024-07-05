import { ChangeEvent, useEffect, useState } from "react";
import CustomDetails from "./ordersModals/CustomDetails";
import ShippingDetails from "./ordersModals/ShippingDetails";
import BillingDetails from "./ordersModals/BillingDetails";
import ProductDetails from "./ordersModals/ProductDetails";
import { useUpdateOrderStatusMutation } from "../../../redux/api/adminApi";
import { useSelector } from "react-redux";
import { useOrderDetailQuery } from "../../../redux/api/commonApi";
import { useParams } from "react-router-dom";
import { userReducerInitialState } from "../../../types/reducer_types";
import { toast } from "react-hot-toast";
import { DetailSkeletonLoading } from "../../../components/loading";
import { showToast } from "../../../feature";
import { server } from "../../../redux/store";
import DeleteOrderProduct from "./ordersModals/DeleteOrderProduct";
import BillingTotalDetails from "./ordersModals/BillingTotalDetails";
import { Product } from "../../../types/types";

const ManageTransactions = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [products, setProducts] = useState<
    { product: Product; quantity: number }[]
  >([]);
  const [productCurrPage, setProductCurrPage] = useState(1);
  const [productTotalPages, setProductTotalPages] = useState(1);
  const { id } = useParams();
  const [orderId, setOrderId] = useState<string>(id!);
  const { user } = useSelector(
    (state: { userReducer: userReducerInitialState }) => state.userReducer
  );

  const { data, isLoading, isError, refetch } = useOrderDetailQuery({
    id: user?._id!,
    orderId: orderId!,
  });

  useEffect(() => {
    if (id) {
      setOrderId(id);
    }
  }, [id]);

  const [selectedProduct, setSelectedProduct] = useState<{
    product: {
      name: string;
      image: string;
      price: number;
      _id: string;
      stock: number;
    };
    quantity: number;
  }>(data?.data.products[0]!);
  // let selectedProduct: {
  //   product: {
  //     name: string;
  //     image: string;
  //     price: number;
  //     _id: string;
  //     stock: number;
  //   };
  //   quantity: number;
  // } = data?.data.products[0]!;
  const customerDetails = {
    name: data?.data?.user?.name ? data?.data.user.name : "No user found",
    email: data?.data?.user?.email,
    phone: null,
    paymentMethod: data?.data.paymentMode!,
    paymentStatus: data?.data.paymentStatus!,
    orderId: data?.data._id!,
  };

  const shippingAddress = {
    address: data?.data.shippingInfo.address
      ? data?.data.shippingInfo.address
      : "",
    orderId: data?.data._id!,
  };
  const billingAddress = {
    address: data?.data.shippingInfo.address,
    city: data?.data.shippingInfo.city,
    state: data?.data.shippingInfo.state,
    country: data?.data.shippingInfo.country,
    pinCode: data?.data.shippingInfo.pinCode!,
    _id: data?.data._id!,
  };

  const [orderStatus, setOrderStatus] = useState(data?.data.status);

  const [changeOrderStatus] = useUpdateOrderStatusMutation();
  const openModal = (type: string) => {
    setModalType(type);
    setIsOpen(true);
  };

  useEffect(() => {
    if (data?.data) {
      const itemsPerPage = 4;
      const skip = itemsPerPage * (productCurrPage - 1);

      const newProducts = data.data.products.slice(skip, skip + itemsPerPage);
      console.log(
        newProducts,
        "this is products",
        skip,
        productTotalPages - 1,
        data?.data.products
      );
      setProducts(newProducts);
      setProductTotalPages(Math.ceil(data.data.products.length / 4));
    }
  }, [data, productCurrPage]);

  const productNextPageHandler = () => {
    if (productTotalPages > productCurrPage) {
      setProductCurrPage((prev) => prev + 1);
      const skip = 4 * (productCurrPage - 1);
      const newProducts = products.slice(skip - 1, productTotalPages - 1);
      setProducts(newProducts);
    }
  };

  const productPrevPageHandler = () => {
    if (productCurrPage > 1) {
      setProductCurrPage((prev) => prev - 1);
      const skip = 4 * (productCurrPage - 1);
      const newProducts = products.slice(skip - 1, productTotalPages - 1);
      setProducts(newProducts);
    }
  };
  const updateOrderStatusHandler = async (
    e: ChangeEvent<HTMLSelectElement>
  ) => {
    setOrderStatus(e.target.value);
    const res = await changeOrderStatus({
      id: id!,
      userId: user?._id!,
      status: e.target.value,
    });
    showToast(res, null, "");
    // refetch();
  };

  const closeModal = () => {
    setIsOpen(false);
    refetch();
  };

  if (isError) return toast.error("Something went wrong while fetching order");
  return isLoading ? (
    <DetailSkeletonLoading />
  ) : (
    <div className="order_details_container">
      <section className="order_id_section">
        <div className="heading_div">
          <h2>{data?.data._id}</h2>
          <h1>{orderStatus}</h1>
          <select
            onChange={updateOrderStatusHandler}
            className={`status_button shipped`}
            value={orderStatus}
          >
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
          </select>
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

            <button onClick={() => openModal("customer_info")}>Edit</button>
          </div>
          <div className="table_container">
            <table>
              <tr>
                <td>Name:</td>
                <td>{customerDetails.name}</td>
              </tr>
              <tr>
                <td>Email:</td>
                <td>{customerDetails.email}</td>
              </tr>
              <tr>
                <td>Mobile:</td>
                <td>
                  {customerDetails.phone
                    ? customerDetails.phone
                    : "Not available"}
                </td>
              </tr>
              <tr>
                <td>Payment Mode:</td>
                <td>{customerDetails.paymentMethod}</td>
              </tr>
              <tr>
                <td>Payment Status:</td>
                <td>{customerDetails.paymentStatus}</td>
              </tr>
            </table>
          </div>
        </div>
        <div className="shipping_address">
          <div className="heading">
            <h1>Shipping Address</h1>
            <button onClick={() => openModal("shipping_info")}>Edit</button>
          </div>
          <p>{shippingAddress.address}</p>
        </div>
        <div className="billing_address">
          <div className="heading">
            <h1>Billing Address</h1>
            <button onClick={() => openModal("billing_info")}>Edit</button>{" "}
          </div>
          <p>
            {billingAddress.address}, {billingAddress.city},
            {billingAddress.state}, {billingAddress.country},
            {billingAddress.pinCode}
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
              <td>Action</td>
            </tr>
            {products.map((product) => {
              return (
                product && (
                  <tr>
                    <td>
                      <img
                        src={server + "/" + product.product.image}
                        alt="no image"
                      />
                    </td>
                    <td>{product.product.name}</td>
                    <td>{product.quantity}</td>
                    <td>{product.product.price}</td>
                    <td>
                      <button
                        onClick={() => {
                          openModal("edit_product");
                          setSelectedProduct(product);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          openModal("delete_product");
                          setSelectedProduct(product);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              );
            })}
          </table>
          <div className="pagination">
            <button onClick={productPrevPageHandler}>Prev</button>
            <span>
              {productCurrPage} of {productTotalPages}
            </span>
            <button onClick={productNextPageHandler}>Next</button>
          </div>
        </div>
        <div className="pricing">
          <div className="heading">
            <h1>SubTotal</h1>
            <button onClick={() => openModal("billing__total__detail")}>
              Edit
            </button>
          </div>
          <table>
            <tr>
              <td>Items</td>

              <td>{data?.data.subTotal}</td>
            </tr>
            <tr>
              <td>Shipping</td>

              <td>{data?.data.shippingCharges}</td>
            </tr>
            <tr>
              <td>Tax</td>

              <td>{data?.data.tax}</td>
            </tr>
            <tr>
              <td>Discount</td>

              <td>{data?.data.discount}</td>
            </tr>
            <tr>
              <th>Total</th>

              <th>{data?.data.total!}</th>
            </tr>
          </table>

          <div className="styler">
            <img src="/assets/ordersanimation.gif" alt="no_image" />
          </div>
        </div>
      </section>
      {isOpen && modalType === "billing_info" && (
        <BillingDetails
          data={billingAddress}
          confirmHandler={() => {}}
          isOpen={isOpen}
          onClose={closeModal}
        />
      )}

      {isOpen && modalType === "customer_info" && (
        <CustomDetails
          data={customerDetails}
          isOpen={isOpen}
          onClose={closeModal}
        />
      )}

      {isOpen && modalType === "shipping_info" && (
        <ShippingDetails
          data={shippingAddress}
          isOpen={isOpen}
          onClose={closeModal}
        />
      )}

      {isOpen && modalType === "edit_product" && (
        <ProductDetails
          data={selectedProduct}
          isOpen={isOpen}
          orderId={data?.data._id!}
          onClose={closeModal}
        />
      )}

      {isOpen && modalType === "delete_product" && (
        <DeleteOrderProduct
          isOpen={isOpen}
          onClose={closeModal}
          data={selectedProduct}
          orderId={orderId!}
        />
      )}
      {isOpen && modalType === "billing__total__detail" && (
        <BillingTotalDetails
          isOpen={isOpen}
          onClose={closeModal}
          data={{
            subTotal: data?.data.subTotal!,
            shipping: data?.data.shippingCharges!,
            tax: data?.data.tax!,
            discount: data?.data.discount!,
          }}
          orderId={orderId!}
        />
      )}
    </div>
  );
};

export default ManageTransactions;
