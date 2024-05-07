import React from "react";

const CustomDetails = () => {
  return (
    <div className="edit_custom_details_container">
      <div className="heading">
        <h2>Edit Customer details</h2>
        <hr />
      </div>

      <div className="intput_container">
        <input type="text" placeholder="Enter name" />
        <input type="text" placeholder="Enter email" />
        <input type="text" placeholder="Enter mobile" />
        <label htmlFor="">Payment Mode</label>
        <select name="" id="">
          <option value="">UPI</option>f<option value="">Net banking</option>
          <option value="">Cash on delivery</option>
        </select>{" "}
        <label htmlFor="">Payment status</label>
        <select name="" id="">
          <option value="">Pending</option>
          <option value="">Paid</option>
        </select>
      </div>
    </div>
  );
};

export default CustomDetails;
