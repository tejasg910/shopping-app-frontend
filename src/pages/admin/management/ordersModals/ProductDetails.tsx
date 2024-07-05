import React, { useState } from "react";
import OpenModal from "../../../../components/common/OpenModal";
import { useSelector } from "react-redux";
import { userReducerInitialState } from "../../../../types/reducer_types";
import axios from "axios";
import { server } from "../../../../redux/store";
import { toast } from "react-hot-toast";
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
type ProductDetailsProps = {
  data: ProductDetails;
  orderId: string;
  isOpen: boolean;
  onClose: () => void;
};
const ProductDetails: React.FC<ProductDetailsProps> = ({
  data,
  orderId,
  isOpen,
  onClose,
}) => {
  const { user } = useSelector(
    (state: { userReducer: userReducerInitialState }) => state.userReducer
  );
  const [productQuantity, setProductQuantity] = useState(data.quantity);
  const [product, setProduct] = useState<{
    name: string;
    image: string;
    price: number;
    _id: string;
    stock: number;
  }>(data.product);

  const decreamentHandler = () => {
    if (productQuantity <= 1) {
      return;
    } else {
      setProductQuantity((prev) => prev - 1);
    }
  };

  const increamentHandler = () => {
    if (productQuantity >= product.stock) {
      return;
    } else {
      setProductQuantity((prev) => prev + 1);
    }
  };
  const confirmHandler = async () => {
    try {
      const response = await axios.put(
        `${server}/api/v1/admin/order/updateOrder?id=${user?._id}`,
        {
          type: "updateProduct",
          orderId: orderId,
          productId: product._id,
          quantity: productQuantity,
          price: product.price,
        }
      );
      console.log(response, "this is response");
      if (response?.data?.success) {
        toast.success(response?.data?.message);
      } else {
        toast.error("Something went wrong while updating order");
      }
      onClose();
    } catch (error) {
      console.log(error, "this is error");
      onClose();
      if (axios.isAxiosError(error)) {
        // The error is an instance of AxiosError
        toast.error(error?.response?.data?.message || "Something went wrong");
      } else {
        // The error is not an instance of AxiosError
        toast.error("Something went wrong");
      }
    }
  };
  return (
    <OpenModal
      isOpen={isOpen}
      cancelButtonName="Cancel"
      onClose={onClose}
      onConfirm={confirmHandler}
      saveButtonName="Save"
    >
      <div className="edit_product_details_container">
        <div className="heading">
          <h1>Edit product</h1>
          <hr />
        </div>

        <div className="input_container">
          <h3 className="product_name">Product name</h3>
          <div className="quantity">
            <button onClick={decreamentHandler}>-</button>
            <span>quantity: {productQuantity}</span>
            <button onClick={increamentHandler}>+</button>
          </div>

          <div className="price_input">
            <input
              onChange={(e) => {
                setProduct((prev) => {
                  return { ...prev, price: parseInt(e.target.value) };
                });
              }}
              value={product.price}
              type="number"
              placeholder="Price"
              min={0}
            />
          </div>
        </div>
      </div>
    </OpenModal>
  );
};

export default ProductDetails;
