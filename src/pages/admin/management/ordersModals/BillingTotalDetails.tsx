import React, { ChangeEvent, useState } from "react";
import OpenModal from "../../../../components/common/OpenModal";
import axios from "axios";
import { server } from "../../../../redux/store";
import { useSelector } from "react-redux";
import { userReducerInitialState } from "../../../../types/reducer_types";
import { toast } from "react-hot-toast";

type BillingCounts = {
  subTotal: number;
  shipping: number;
  tax: number;
  discount: number;
};

type BillingDetailsProps = {
  data: BillingCounts;
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
};
const BillingTotalDetails: React.FC<BillingDetailsProps> = ({
  data,
  isOpen,
  onClose,
  orderId,
}) => {
  const { user } = useSelector(
    (state: { userReducer: userReducerInitialState }) => state.userReducer
  );
  const [billingData, setBillingData] = useState<BillingCounts>({
    discount: data.discount,
    shipping: data.shipping,
    subTotal: data.subTotal,
    tax: data.tax,
  });
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setBillingData((prev) => {
      return {
        ...prev,
        [name]: Number(value),
      };
    });
  };

  const confirmHandler = async () => {
    try {
      const response = await axios.put(
        `${server}/api/v1/admin/order/updateOrder?id=${user?._id}`,
        {
          type: "subTotal",
          orderId: orderId,
          subTotal: billingData.subTotal,
          shippingCharges: billingData.shipping,
          tax: billingData.tax,
          discount: billingData.discount,
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
      cancelButtonName="Cancel"
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={confirmHandler}
      saveButtonName="Save"
    >
      <div className="edit__billing__counts_container">
        <h2>Edit billing details</h2>
        <label htmlFor="">SubTotal</label>
        <input
          type="number"
          name="subTotal"
          value={billingData.subTotal}
          onChange={changeHandler}
        />

        <label htmlFor="">Shipping Charges</label>
        <input
          type="number"
          name="shipping"
          value={billingData.shipping}
          onChange={changeHandler}
        />

        <label htmlFor="">Tax</label>
        <input
          type="number"
          name="tax"
          value={billingData.tax}
          onChange={changeHandler}
        />

        <label htmlFor="">Discount</label>
        <input
          type="number"
          name="discount"
          value={billingData.discount}
          onChange={changeHandler}
        />
      </div>
    </OpenModal>
  );
};

export default BillingTotalDetails;
