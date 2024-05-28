import React from "react";
import OpenModal from "../../../../components/common/OpenModal";
import axios from "axios";
import { server } from "../../../../redux/store";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { userReducerInitialState } from "../../../../types/reducer_types";

type ProductDetails = {
  product: {
    name: string;
    image: string;
    price: number;
    _id: string;
    stock: number;
  };
  quantity: number;
};
type DeleteProductProps = {
  data: ProductDetails;
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
};
const DeleteOrderProduct: React.FC<DeleteProductProps> = ({
  isOpen,
  onClose,
  data,
  orderId,
}) => {
  const { user } = useSelector(
    (state: { userReducer: userReducerInitialState }) => state.userReducer
  );
  const confirmHandler = async () => {
    try {
      console.log(orderId, " orderId");
      const response = await axios
        .delete(`${server}/api/v1/admin/order/deleteProduct?id=${user?._id}`, {
          data: {
            productId: data.product._id,
            orderId: orderId,
          },
        })
        .catch((err) => {
          console.log("came in catch", err);
          toast.error(
            err?.response?.data?.message ||
              "Something went wrong while deleting product"
          );
          onClose();
        });

      if (response?.data?.success) {
        
        toast.success(response?.data?.message);
      }
      onClose();
    } catch (error) {
      console.log("came in catch", error);
      onClose();
    }
  };
  return (
    <OpenModal
      isOpen={isOpen}
      saveButtonName="Delete"
      cancelButtonName="Cancel"
      onClose={onClose}
      onConfirm={confirmHandler}
    >
      <h2>Are you sure delete {data.product.name}</h2>
    </OpenModal>
  );
};

export default DeleteOrderProduct;
