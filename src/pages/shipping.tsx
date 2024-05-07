import React, { ChangeEvent, useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cartReducerInitialState } from "../types/reducer_types";

const Shipping = () => {
  const { cartItems } = useSelector(
    (state: { cartReducer: cartReducerInitialState }) => state.cartReducer
  );
  const navigate = useNavigate();
  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    pin: "",
  });

  const changeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setShippingInfo((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  useEffect(() => {
    if (cartItems.length <= 0) return navigate("/cart");
  }, []);
  return (
    <div className="shipping">
      <button
        onClick={() => {
          navigate("/cart");
        }}
        className="backButton"
      >
        <BiArrowBack />
      </button>
      <form action="">
        <h1>Shipping Address</h1>
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={shippingInfo.address}
          onChange={changeHandler}
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={shippingInfo.city}
          onChange={changeHandler}
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          value={shippingInfo.state}
          onChange={changeHandler}
        />
        <select
          required
          name="country"
          id=""
          onChange={changeHandler}
          value={shippingInfo.country}
        >
          <option value="">Choose Country</option>
          <option value="india">India</option>
        </select>
        <input
          type="text"
          name="pin"
          placeholder="Pin"
          value={shippingInfo.pin}
          onChange={changeHandler}
        />
        <input className="submitBtn" type="submit" value="PAY" />
      </form>
    </div>
  );
};

export default Shipping;
