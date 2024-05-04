import React from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { CartItem } from "../types/types";
type ProductsProps = {
  image: string;
  name: string;
  price: number;
  productId: string;
  stock: number;

  handler: (cartItem: CartItem) => void;
};

const server = "";
const ProductCard = ({
  image,
  name,
  price,
  productId,
  stock,
  handler,
}: ProductsProps) => {
  return (
    <div className="productCard">
      <img src={image} alt={name} />
      <p>{name}</p>
      <span>${price}</span>
      <div>
        <button
          onClick={() =>
            handler({ image, name, price, productId, quantity: 1, stock })
          }
        >
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
