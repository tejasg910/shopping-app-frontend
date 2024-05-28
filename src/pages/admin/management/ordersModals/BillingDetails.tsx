import React, { ChangeEvent, useState } from "react";
import OpenModal from "../../../../components/common/OpenModal";
import { useSelector } from "react-redux";
import { userReducerInitialState } from "../../../../types/reducer_types";
import axios from "axios";
import { server } from "../../../../redux/store";
import { toast } from "react-hot-toast";

type BillingData = {
  address: string | undefined;
  city: string | undefined;
  state: string | undefined;
  country: string | undefined;
  pinCode: string;
  _id: string;
};
type BillingAddressProps = {
  data: BillingData;
  isOpen: boolean;
  onClose: () => void;
  confirmHandler: () => void;
};
const BillingDetails: React.FC<BillingAddressProps> = ({
  data,
  isOpen,
  onClose,
}) => {
  const { user } = useSelector(
    (state: { userReducer: userReducerInitialState }) => state.userReducer
  );
  const [billingDetails, setBillingDetails] = useState({
    address: data.address,
    city: data.city,
    state: data.state,
    country: data.country,
    pinCode: data.pinCode,
  });

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setBillingDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const confirmHandler = async () => {
    try {
      const response = await axios.put(
        `${server}/api/v1/admin/order/updateOrder?id=${user?._id}`,
        {
          type: "billingAddress",
          orderId: data._id,
          shippingInfo: billingDetails,
        }
      );
      if (response?.data?.success) {
        toast.success(response?.data?.message);
      } else {
        toast.error("Something went wrong while updating order");
      }
      onClose();
    } catch (error) {
      onClose();
    }
  };
  return (
    <OpenModal
      cancelButtonName="cancel"
      isOpen={isOpen}
      onClose={onClose}
      saveButtonName="Save"
      onConfirm={confirmHandler}
    >
      <div className="edit_billing_details_container">
        <div className="heading">
          <h1>Edit Billing Details</h1>
          <hr />
        </div>

        <div className="input_container">
          <label htmlFor="">Address</label>
          <input
            type="text"
            name="address"
            onChange={changeHandler}
            value={billingDetails.address}
          />

          <label htmlFor="">City</label>
          <input
            type="text"
            name="city"
            onChange={changeHandler}
            value={billingDetails.city}
          />

          <label htmlFor="">State</label>
          <input
            type="text"
            name="state"
            onChange={changeHandler}
            value={billingDetails.state}
          />

          <label htmlFor="">Country</label>
          <input
            type="text"
            name="country"
            onChange={changeHandler}
            value={billingDetails.country}
          />

          <label htmlFor="">Pin Code</label>
          <input
            type="text"
            name="pinCode"
            onChange={changeHandler}
            value={billingDetails.pinCode}
          />
        </div>
      </div>
    </OpenModal>
  );
};

export default BillingDetails;
