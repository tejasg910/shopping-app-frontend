import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/productcard";
import { useGetLatestProductsQuery } from "../redux/api/commonApi";
import Loader from "../components/admin/Loader";
import { server } from "../redux/store";
import { toast } from "react-hot-toast";
import { SiDigikeyelectronics } from "react-icons/si";
import { SkeletonLoading } from "../components/loading";
import { Carousel } from "react-responsive-carousel";
import FeatureProdcutCard from "../components/products/FeatureProdcutCard";
import OfferCard from "../components/products/OfferCard";
import { CartItem } from "../types/types";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/reducer/cartReducer";
import { cartReducerInitialState } from "../types/reducer_types";
import { IoEllipseSharp } from "react-icons/io5";

const Home = () => {
  const { cartItems } = useSelector(
    (state: { cartReducer: cartReducerInitialState }) => state.cartReducer
  );

  const { data, isError, isLoading } = useGetLatestProductsQuery("");
  if (isError) toast.error("Error while fetching products");
  console.log(server + "/" + data?.data[0].image);
  const dispatch = useDispatch();
  const addToCartHandler = (cartItem: CartItem) => {
    dispatch(addToCart(cartItem));
    const item = cartItems.find(
      (item) => item.productId === cartItem.productId
    );

    if (!item) {
      toast.success("Item added to cart");
    } else {
      if (item?.stock! > item?.quantity!) {
        toast.success("Item added to cart");
      } else {
        toast.error("Out of stock");
      }
    }
  };
  return (
    <div className="home">
      <FeatureProdcutCard />

      <h1>
        Latest Products{" "}
        <Link to={"/search"} className="find-more">
          More
        </Link>
      </h1>

      <main className="latestProdcuts">
        {isLoading ? (
          <SkeletonLoading />
        ) : (
          <Carousel centerMode={true} centerSlidePercentage={50}>
            {data?.data.map((product) => {
              return (
                <ProductCard
                  key={product._id}
                  productId={product._id}
                  price={product.price}
                  stock={product.stock}
                  image={server + "/" + product.image}
                  handler={addToCartHandler}
                  name={product.name}
                />
              );
            })}
          </Carousel>
        )}
      </main>
    </div>
  );
};

export default Home;
