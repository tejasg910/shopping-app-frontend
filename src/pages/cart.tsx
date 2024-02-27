import React, { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import CartItem from "../components/cart/CartItem";
import { Link } from "react-router-dom";
const cartItems = [
  {
    productId: "fsdfsfd",
    image:
      "https://rukminim2.flixcart.com/image/416/416/xif0q/computer/y/l/p/-original-imagqmqjv5cyvbup.jpeg?q=70&crop=false",
    name: "Acer",
    price: 20,
    quantity: 4,
    stock: 10,
  },
];
const subTotal = 4000;
const tax = Math.round(subTotal * 0.18);
const shippingCharges = 200;
const total = subTotal + tax + shippingCharges;
const dicount = 400;
const Cart = () => {
  const [coupneCode, setCoupneCode] = useState<string>("");
  const [isValidcoupenCode, setIsValidCoupneCode] = useState<boolean>(false);
  useEffect(() => {
    const id = setTimeout(() => {
      if (Math.random() > 0.5) {
        setIsValidCoupneCode(true);
      } else {
        setIsValidCoupneCode(false);
      }
    }, 1000);

    return () => {
      clearTimeout(id);
    };
  }, [coupneCode]);

  return (
    <div className="cart">
      <main>
        {cartItems.length > 0 ? (
          cartItems.map((cart, index) => <CartItem key={index} cart={cart} />)
        ) : (
          <h1>No items in cart</h1>
        )}
      </main>
      <aside>
        <p>SubTotal: {subTotal}</p>
        <p>Shipping charges: {shippingCharges}</p>
        <p>Tax: {tax}</p>
        <p>
          Discount: <em className="red">- ${dicount}</em>
        </p>

        <p>
          Total: <b> {total}</b>
        </p>
        <input
          value={coupneCode}
          onChange={(e) => setCoupneCode(e.target.value)}
          type="text"
          placeholder="Coupen Code"
        />
        {coupneCode &&
          (isValidcoupenCode ? (
            <span className="green">
              ${dicount} off using <code>${coupneCode}</code>
            </span>
          ) : (
            <span className="red">
              {" "}
              <VscError /> Invalid coupen code
            </span>
          ))}

        {cartItems.length > 0 && <Link to={"/shipping"}>Checkout</Link>}
      </aside>
    </div>
  );
};

export default Cart;
