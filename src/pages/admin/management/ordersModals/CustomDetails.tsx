import React, { ChangeEvent, useState } from "react";
import OpenModal from "../../../../components/common/OpenModal";
import axios from "axios";
import { server } from "../../../../redux/store";
import { useSelector } from "react-redux";
import { userReducerInitialState } from "../../../../types/reducer_types";
import { toast } from "react-hot-toast";
type CustomDetailsProps = {
  data: CustomerDataProps;
  isOpen: boolean;
  onClose: () => void;
};

type CustomerDataProps = {
  paymentMethod: string;
  paymentStatus: string;
  orderId: string;
};

const CustomDetails: React.FC<CustomDetailsProps> = ({
  data,
  isOpen,
  onClose,
}) => {
  const { user } = useSelector(
    (state: { userReducer: userReducerInitialState }) => state.userReducer
  );
  const [customerDetails, setcustomerDetails] = useState({
    paymentMethod: data.paymentMethod,
    paymentStatus: data.paymentStatus,
  });

  const changeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    e.preventDefault();
    const { name, value } = e.target;
    console.log(name);
    console.log(value);
    setcustomerDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const confirmHandler = async () => {
    try {
      const response = await axios
        .put(`${server}/api/v1/admin/order/updateOrder?id=${user?._id}`, {
          type: "customerInfo",
          orderId: data.orderId,
          paymentMode: customerDetails.paymentMethod,
          paymentStatus: customerDetails.paymentStatus,
        })
        .catch((err) => {
          console.log("came in catch", err);

          onClose();
        });

      if (response?.data?.success) {
        toast.success(response?.data?.message);
      } else {
        toast.error("Something went wrong while updating order");
      }
      onClose();
    } catch (error) {
      console.log("came in catch", error);
      onClose();
    }
  };
  return (
    <OpenModal
      cancelButtonName="Cancel"
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={confirmHandler}
      saveButtonName="Save"
    >
      <div className="edit_custom_details_container">
        <div className="heading">
          <h2>Edit Customer details</h2>
          <hr />
        </div>

        <div className="intput_container">
          <label htmlFor="">Payment Mode</label>
          <select
            onChange={changeHandler}
            value={customerDetails.paymentMethod}
            name="paymentMethod"
            id=""
          >
            <option value="UPI">UPI</option>f
            <option value="Net-Banking">Net banking</option>
            <option value="Cash on Delivery">Cash on delivery</option>
          </select>{" "}
          <label htmlFor="">Payment status</label>
          <select
            onChange={changeHandler}
            value={customerDetails.paymentStatus}
            name="paymentStatus"
            id=""
          >
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
          </select>
        </div>
      </div>
    </OpenModal>
  );
};

export default CustomDetails;
