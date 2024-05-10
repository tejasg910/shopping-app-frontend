import  { useState } from "react";
import EditCustomerDetails from "../../../components/common/OpenModal";
import CustomDetails from "./ordersModals/CustomDetails";
import ShippingDetails from "./ordersModals/ShippingDetails";
import BillingDetails from "./ordersModals/BillingDetails";
import ProductDetails from "./ordersModals/ProductDetails";

const ManageTransactions = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  const openModal = (type: string) => {
    setModalType(type);
    setIsOpen(true);
  };
  const closeModal = () => setIsOpen(false);
  return (
    <div className="order_details_container">
      <section className="order_id_section">
        <div className="heading_div">
          <h2>434u3oi423i08304</h2>
          <h1>Shipped</h1>
          <select className={`status_button shipped`}>
            Shipped
            <option value="">Processing</option>
            <option value="">Shipped</option>
            <option value="">Delivered</option>
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
                <td>Peter</td>
              </tr>
              <tr>
                <td>Email:</td>
                <td>peter@gmail.com</td>
              </tr>
              <tr>
                <td>Mobile:</td>
                <td>65932323656</td>
              </tr>
              <tr>
                <td>Payment Mode:</td>
                <td>Cash on Delivery</td>
              </tr>
              <tr>
                <td>Payment Status:</td>
                <td>Pending</td>
              </tr>
            </table>
          </div>
        </div>
        <div className="shipping_address">
          <div className="heading">
            <h1>Shipping Address</h1>
            <button onClick={() => openModal("shipping_info")}>Edit</button>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum,
            harum.
          </p>
        </div>
        <div className="billing_address">
          <div className="heading">
            <h1>Billing Address</h1>
            <button onClick={() => openModal("billing_info")}>Edit</button>{" "}
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum,
            harum.
          </p>
        </div>
      </section>
      <section className="pricing_section">
        <div className="list">
          <div className="heading">
            <h1>Order summary</h1>
            <button>Edit</button>
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
            <tr>
              <td>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtSAemsiNfr91v0uO0vaeULKZuCjZ-ErfJfF_sSWaHFQ&s"
                  alt="no image"
                />
              </td>
              <td>fdsfsdfsfdsfdsfsd</td>
              <td>2</td>
              <td>2000</td>
              <td>
                <button onClick={() => openModal("edit_product")}>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
            <tr>
              <td>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtSAemsiNfr91v0uO0vaeULKZuCjZ-ErfJfF_sSWaHFQ&s"
                  alt="no image"
                />
              </td>
              <td>fdsfs</td>
              <td>2</td>
              <td>2000</td>{" "}
              <td>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>{" "}
            <tr>
              <td>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtSAemsiNfr91v0uO0vaeULKZuCjZ-ErfJfF_sSWaHFQ&s"
                  alt="no image"
                />
              </td>
              <td>chair</td>
              <td>2</td>
              <td>2000</td>{" "}
              <td>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>{" "}
            <tr>
              <td>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtSAemsiNfr91v0uO0vaeULKZuCjZ-ErfJfF_sSWaHFQ&s"
                  alt="no image"
                />
              </td>
              <td>chair</td>
              <td>2</td>
              <td>2000</td>{" "}
              <td>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          </table>
        </div>
        <div className="pricing">
          <div className="heading">
            <h1>SubTotal</h1>
          </div>
          <table>
            <tr>
              <td
                contentEditable
                onBlur={(e) => {
                  console.log(e);
                }}
              >
                Items
              </td>

              <td>2000</td>
            </tr>
            <tr>
              <td>Shipping</td>

              <td>2000</td>
            </tr>
            <tr>
              <td>Tax</td>

              <td>2000</td>
            </tr>
            <tr>
              <th>Total</th>

              <th>2000</th>
            </tr>
          </table>

          <div className="styler">
            <img src="/assets/ordersanimation.gif" alt="no_image" />
          </div>
        </div>
      </section>

      <EditCustomerDetails
        saveButtonName={"Save"}
        cancelButtonName={"Cancel"}
        isOpen={isOpen}
        onClose={closeModal}
      >
        {isOpen && modalType === "customer_info" && <CustomDetails />}
        {isOpen && modalType === "shipping_info" && <ShippingDetails />}
        {isOpen && modalType === "billing_info" && <BillingDetails />}

        {isOpen && modalType === "edit_product" && <ProductDetails />}
      </EditCustomerDetails>
    </div>
  );
};

export default ManageTransactions;
