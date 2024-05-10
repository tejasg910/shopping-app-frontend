import  { FormEvent, useState } from "react";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-hot-toast";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  cartReducerInitialState,
  userReducerInitialState,
} from "../types/reducer_types";
import axios from "axios";
import { server } from "../redux/store";
import { resetCart } from "../redux/reducer/cartReducer";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51MyIicSH0DotAFf8fTlBtCtrDg3spc3GSVxtWOKmCt2jq4FC463HIrZd0DYv6JqJddPTgY0Kbi46jE10WAOXFsUS00ZfCZTEDJ"
);

const CheckoutForm = () => {
  const { user } = useSelector(
    (state: { userReducer: userReducerInitialState }) => state.userReducer
  );
  const {
    cartItems,
    discount,

    shippingCharges,
    shippingInfo,
    subTotal,
    tax,
    total,
  } = useSelector(
    (state: { cartReducer: cartReducerInitialState }) => state.cartReducer
  );
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const products = cartItems.map((item) => {
      return {
        product: item.productId,
        quantity: item.quantity,
      };
    });
    const orderData = {
      products,
      discount,
      name: user?.name!,
      shippingCharges,
      shippingInfo,
      subTotal,
      tax,
      total,
      user: user?._id!,
    };

    if (!stripe || !elements) return;
    setIsProcessing(true);
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
      confirmParams: { return_url: window.location.origin },
    });

    if (error) {
      setIsProcessing(false);
      return toast.error(error.message || "Something went wrong");
    }

    if (paymentIntent.status === "succeeded") {
      //place new order

      const resposeofnewOrder = await axios.post(
        `${server}/api/v1/user/order/new`,
        orderData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (resposeofnewOrder?.data?.success) {
        dispatch(resetCart());
        navigate("/order/success?referrer=/pay");
      } else {
        navigate("/order/failed?referrer=/pay");
      }
    } else {
      navigate("/order/failed?referrer=/pay");
    }
    setIsProcessing(false);
  };
  return (
    <div className="payment_form">
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <button disabled={isProcessing}>
          {isProcessing ? "Processing" : "Pay"}
        </button>
      </form>
    </div>
  );
};
const Checkout = () => {
  const location = useLocation();
  const clientSecret: string | undefined = location.state;

  if (!clientSecret) return <Navigate to={"/shipping"} />;
  const options = {
    // passing the client secret obtained from the server
    clientSecret,
  };
  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  );
};

export default Checkout;
