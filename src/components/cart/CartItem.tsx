import React from "react";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
type CartItemProps = {
  cart: any;
};
const CartItem = ({ cart }: CartItemProps) => {
  return (
    <div className="cartitem">
      <img src={cart.image} alt={cart.name} />
      <article>
        <Link to={`/product/${cart.productId}`}>{cart.name} </Link>
        <span>${cart.price}</span>
      </article>
      <div>
        <button>-</button>
        <span>{cart.quantity}</span>
        <button>+</button>
      </div>

      <button>
        <FaTrash />
      </button>
    </div>
  );
};

export default CartItem;
