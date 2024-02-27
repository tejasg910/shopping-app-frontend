import React from "react";
import { FaPlus } from "react-icons/fa";
type ProductsProps = {
  image: string;
  name: string;
  price: number;
  productId: string;
  stock: number;
  handler: () => void;
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
        <button onClick={() => handler()}>
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
