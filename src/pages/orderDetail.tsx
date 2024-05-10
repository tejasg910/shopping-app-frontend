import React, { useState } from "react";
import OpenModal from "../components/common/OpenModal";

const OrderDetail = () => {
  const [isOpen, setIsOpen] = useState(false);

  const OpenDialogHandler = () => {
    setIsOpen(true);
  };
  const CloseDialogHandler = () => {
    setIsOpen(false);
  };
  return (
    <div className="main_container_orderDetails">
      
      <div
        className="orderDetail"
        style={isOpen ? { opacity: 0.4 } : { opacity: 1 }}
      >


        <div className="order_details_status_container">
        <div className="container">
  <div className="row">
						<div className="col-12 col-md-10 hh-grayBox pt45 pb20">
							<div className="row justify-content-between">
								<div className="order-tracking completed">
									<span className="is-complete"></span>
									<p>Ordered<br/><span>Mon, June 24</span></p>
								</div>
								<div className="order-tracking completed">
									<span className="is-complete"></span>
									<p>Shipped<br/><span>Tue, June 25</span></p>
								</div>
								<div className="order-tracking">
									<span className="is-complete"></span>
									<p>Delivered<br/><span>Fri, June 28</span></p>
								</div>
							</div>
						</div>
					</div>
</div>
        </div>
        <h1 className="heading">Order summary</h1>

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
          <div className="btn_div">
            <button disabled={isOpen} onClick={OpenDialogHandler}></button>
          </div>
        </div>
      </div>

      <OpenModal
        cancelButtonName="Cancel"
        isOpen={isOpen}
        onClose={CloseDialogHandler}
        saveButtonName="Confirm"
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
