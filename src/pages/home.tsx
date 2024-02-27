import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/productcard";

const Home = () => {
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
        <ProductCard
          productId="2sfsdfsd"
          price={20}
          stock={10}
          image="https://rukminim2.flixcart.com/image/416/416/xif0q/computer/y/l/p/-original-imagqmqjv5cyvbup.jpeg?q=70&crop=false"
          handler={addToCartHandler}
          name="ACER"
        />
      </main>
    </div>
  );
};

export default Home;
