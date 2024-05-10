import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cartReducerInitialState } from "../types/reducer_types";
import { toast } from "react-hot-toast";
import axios from "axios";
import { server } from "../redux/store";
import { saveShippingInfo } from "../redux/reducer/cartReducer";

const Shipping = () => {
  const { cartItems, total } = useSelector(
    (state: { cartReducer: cartReducerInitialState }) => state.cartReducer
  );
  const navigate = useNavigate();
  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
  });

  const dispatch = useDispatch();

  const changeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setShippingInfo((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      dispatch(saveShippingInfo(shippingInfo));
      const res = await axios.post(`${server}/api/v1/pay/new`, {
        amount: total,
      });
      console.log(res, "this is res");
      navigate("/pay", { state: res.data?.data?.clientSecret });
    } catch (error) {
      toast.error("Something went wrong");
    }
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
      <form action="" onSubmit={submitHandler}>
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
          name="pinCode"
          placeholder="Pin"
          value={shippingInfo.pinCode}
          onChange={changeHandler}
        />
        <input className="submitBtn" type="submit" value="PAY" />
      </form>
    </div>
  );
};

export default Shipping;
