import  { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import CartItem from "../components/cart/CartItem";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartReducerInitialState } from "../types/reducer_types";
import { CartItem as CartItemType } from "../types/types";
import {
  addToCart,
  applyDiscount,
  calcaulatePricing,
  decreamentCart,
  removeCartItem,
} from "../redux/reducer/cartReducer";
import axios from "axios";
import { server } from "../redux/store";

const Cart = () => {
  const {
    cartItems,
    discount,
    
    shippingCharges,
  
    subTotal,
    tax,
    total,
  } = useSelector(
    (state: { cartReducer: cartReducerInitialState }) => state.cartReducer
  );

  const dispatch = useDispatch();
  const [coupneCode, setCoupneCode] = useState<string>("");
  const [isValidcoupenCode, setIsValidCoupneCode] = useState<boolean>(false);
  useEffect(() => {
    const { token, cancel } = axios.CancelToken.source();
    const id = setTimeout(() => {
      axios
        .get(`${server}/api/v1/pay/coupon/discount?coupon=${coupneCode}`, {
          cancelToken: token,
        })
        .then((res) => {
          setIsValidCoupneCode(true);
          console.log(res.data.data.discount);
          dispatch(applyDiscount(res.data.data.discount));
          dispatch(calcaulatePricing());
        })
        .catch(() => {
          setIsValidCoupneCode(false);
          dispatch(applyDiscount(0));
          dispatch(calcaulatePricing());
        });
    }, 1000);

    return () => {
      cancel();
      clearTimeout(id);
    };
  }, [coupneCode]);

  const increamentHandler = (cartItem: CartItemType) => {
    if (cartItem.quantity >= cartItem.stock) return;
    dispatch(addToCart(cartItem));
  };
  const decreamentHandler = (cartItem: CartItemType) => {
    if (cartItem.quantity <= 1) return;

    dispatch(decreamentCart(cartItem));
  };
  const removeCartHandler = (productId: string) => {
    dispatch(removeCartItem(productId));
  };

  useEffect(() => {
    dispatch(calcaulatePricing());
  }, [cartItems]);
  return (
    <div className="cart">
      <main>
        {cartItems.length > 0 ? (
          cartItems.map((cart, index) => (
            <CartItem
              increamentHandler={increamentHandler}
              decreamentHandler={decreamentHandler}
              removeCartHandler={removeCartHandler}
              key={index}
              cart={cart}
            />
          ))
        ) : (
          <h1>No items in cart</h1>
        )}
      </main>
      <aside>
        <p>SubTotal: {subTotal}</p>
        <p>Shipping charges: {shippingCharges}</p>
        <p>Tax: {tax}</p>
        <p>
          Discount: <em className="red">- {discount}</em>
        </p>

        <p>
          Total: <b> {total}</b>
        </p>
        {cartItems.length > 0 && (
          <input
            value={coupneCode}
            onChange={(e) => setCoupneCode(e.target.value)}
            type="text"
            placeholder="Coupen Code"
          />
        )}
        {coupneCode &&
          (isValidcoupenCode ? (
            <span className="green">
              ${discount} off using <code>{coupneCode}</code>
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
