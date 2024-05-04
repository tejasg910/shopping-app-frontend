import React from "react";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CartItem } from "../../types/types";
type CartItemProps = {
  cart: CartItem;
  increamentHandler: (cartItem: CartItem) => void;
  decreamentHandler: (cartItem: CartItem) => void;
  removeCartHandler: (productId: string) => void;
};
const CartItem = ({
  cart,
  increamentHandler,
  decreamentHandler,
  removeCartHandler,
}: CartItemProps) => {
  return (
    <div className="cartitem">
      <img src={cart.image} alt={cart.name} />
      <article>
        <Link to={`/product/${cart.productId}`}>{cart.name} </Link>
        <span>${cart.price}</span>
      </article>
      <div>
        <button onClick={() => decreamentHandler(cart)}>-</button>
        <span>{cart.quantity}</span>
        <button onClick={() => increamentHandler(cart)}>+</button>
      </div>

      <button onClick={() => removeCartHandler(cart.productId)}>
        <FaTrash />
      </button>
    </div>
  );
};

export default CartItem;
