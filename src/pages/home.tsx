import { Link } from "react-router-dom";
import ProductCard from "../components/productcard";
import { useGetLatestProductsQuery } from "../redux/api/commonApi";
import { server } from "../redux/store";
import { toast } from "react-hot-toast";
import { SkeletonLoading } from "../components/loading";
import { Carousel } from "react-responsive-carousel";
import FeatureProdcutCard from "../components/products/FeatureProdcutCard";
import { CartItem } from "../types/types";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/reducer/cartReducer";
import {
  cartReducerInitialState,
  userReducerInitialState,
} from "../types/reducer_types";
import NotFound from "../components/notfound";
import OfferCard from "../components/products/OfferCard";
import { useGetFeaturedProductQuery } from "../redux/api/adminApi";

const Home = () => {
  const { cartItems } = useSelector(
    (state: { cartReducer: cartReducerInitialState }) => state.cartReducer
  );
  const { user } = useSelector(
    (state: { userReducer: userReducerInitialState }) => state.userReducer
  );

  const { data: featureProductData } = useGetFeaturedProductQuery(user?._id!);

  const { data, isError, isLoading } = useGetLatestProductsQuery("");
  if (isError) toast.error("Error while fetching products");
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
      {featureProductData?.data?.discount && (
        <OfferCard discount={featureProductData?.data.discount} />
      )}
      <div className="gradient_bar"></div>

      <FeatureProdcutCard
        product={
          featureProductData?.data?.product
            ? featureProductData?.data?.product
            : null
        }
        addToCartHandler={addToCartHandler}
      
      />

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
                  image={ product.image}
                  handler={addToCartHandler}
                  name={product.name}
                />
              );
            })}
          </Carousel>
        )}
      </main>

      {data?.data.length === 0 && <NotFound />}
    </div>
  );
};

export default Home;
