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

const Home = () => {
  const { data, isError, isLoading } = useGetLatestProductsQuery("");
  if (isError) toast.error("Error while fetching products");
  console.log(server + "/" + data?.data[0].image);
  const addToCartHandler = () => {};
  return (
    <div className="home">
      <section className="cover"></section>

      <h1>
        Latest Products{" "}
        <Link to={"/search"} className="find-more">
          More
        </Link>
      </h1>

      <main>
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
