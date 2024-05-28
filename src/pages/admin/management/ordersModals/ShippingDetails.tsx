import React, { useState } from "react";
import OpenModal from "../../../../components/common/OpenModal";
import axios from "axios";
import { server } from "../../../../redux/store";
import { useSelector } from "react-redux";
import { userReducerInitialState } from "../../../../types/reducer_types";
import { toast } from "react-hot-toast";

type ShippingData = {
  address: string;
  orderId: string;
};
type ShippingDetailsProps = {
  data: ShippingData;
  isOpen: boolean;
  onClose: () => void;
};
const ShippingDetails: React.FC<ShippingDetailsProps> = ({
  data,
  isOpen,
  onClose,
}) => {
  const { user } = useSelector(
    (state: { userReducer: userReducerInitialState }) => state.userReducer
  );
  const [shippingAddress, setShippingAdress] = useState(data.address);
  const confirmHandler = async () => {
    const response = await axios.put(
      `${server}/api/v1/admin/order/updateOrder?id=${user?._id}`,
      {
        type: "shippingAddress",
        orderId: data.orderId,
        billingAddress: shippingAddress,
      }
    );
    if (response?.data?.success) {
      toast.success(response?.data?.message);
    } else {
      toast.error("Something went wrong while updating order");
    }
    onClose();
  };
  return (
    <OpenModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={confirmHandler}
      cancelButtonName="Cancel"
      saveButtonName="Save"
    >
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
            value={shippingAddress}
            onChange={(e) => setShippingAdress(e.target.value)}
            rows={10}
            placeholder="Enter address"
          ></textarea>
        </div>
      </div>
    </OpenModal>
  );
};

export default ShippingDetails;
