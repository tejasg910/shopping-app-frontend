import React from "react";

const ShippingDetails = () => {
  return (
    <div className="edit_shipping_details_container">
      <div className="heading">
        <h1>Edit Shipping Details</h1>
        <hr />
      </div>

      <div className="input_container">
        <textarea
          name=""
          id=""
          cols={20}
          rows={10}
          placeholder="Enter address"
        ></textarea>
      </div>
    </div>
  );
};

export default ShippingDetails;
