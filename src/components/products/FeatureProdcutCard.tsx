import { useEffect, useRef, useState } from "react";
import {
  motion,
  useAnimation,
  useInView,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { Product } from "../../types/types";
import { server } from "../../redux/store";

const FeatureProdcutCard = ({ product }: { product: Product | null }) => {
  const ref = useRef(null);
  const { scrollY, scrollYProgress } = useScroll({ container: ref });
  const isInview = useInView(ref);
  useEffect(() => {
    console.log("is in view", isInview);
  }, [isInview]);
  const [headingContent, setHeadingContent] = useState(
    "Exclusive offer, secure yours promptly"
  );

  const texts = useTransform(
    scrollYProgress,
    [0, 1],
    ["this is first", "this is second"]
  );
  console.log(texts, "this is texts");
  const controls = useAnimation();
  const animateHeading = () => {
    controls.start({ opacity: 1, y: 0, transition: { duration: 0.5 } });
  };
  // Update heading content based on scroll progress
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    console.log(latest, "this is latest");

    if (latest === 0) {
      setHeadingContent("Exclusive offer, secure yours promptly");
      animateHeading();
    }
    if (latest === 1) {
      setHeadingContent("Prime opportunity, seize it swiftly.");
      animateHeading();
    }
  });
  console.log(window.innerHeight, "innerheigiht");
  const YofHeroHeading = useTransform(scrollY, [0, 10], [-50, 0]);
  const opacityOfHeroHeading = useTransform(scrollY, [0, 10], [0, 1]);
  return (
    <div ref={ref} className="feature_product_card_container">
      <div className="container">
        <div>
          <motion.div
            initial={{ opacity: 0, x: -50 }} // Initial animation properties
            animate={{ opacity: 1, x: 0 }} // Animation properties to animate to
            transition={{ duration: 0.5 }} // Duration of the animation
          >
            <div className="main_info">
              <h1 className="heading">
                Get extra off <br /> on this purchase
              </h1>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -50 }} // Initial animation properties
            animate={{ opacity: 1, x: 0 }} // Animation properties to animate to
            transition={{ duration: 0.5 }} // Duration of the animation
          >
            <div className="shop_now">
              <button className="primary_button">Shop Now</button>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 500 }} // Initial animation properties
          animate={{ opacity: 1, y: 0 }} // Animation properties to animate to
          transition={{ duration: 0.5 }} // Duration of the animation
        >
          {product ? (
            <section className="card">
              <div className="product-image">
                <img
                  src={server + "/" + product.image}
                  alt="OFF-white Red Edition"
                  draggable="false"
                />
              </div>
              <div className="product-info">
                <h2>{product.name}</h2>
                <p>{product.category}</p>
                <div className="price">₹{product.price}</div>
              </div>
              <div className="btn">
                <button className="buy-btn">Add to cart</button>
                <button className="fav">
                  <svg
                    className="svg"
                    id="i-star"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    stroke="#000"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                  >
                    <path d="M16 2 L20 12 30 12 22 19 25 30 16 23 7 30 10 19 2 12 12 12 Z" />
                  </svg>
                </button>
              </div>
            </section>
          ) : (
            <section className="card">
              <img src="/assets/images/store.png" />
            </section>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }} // Initial animation properties
          animate={{ opacity: 1, x: 0 }} // Animation properties to animate to
          transition={{ duration: 0.5 }} // Duration of the animation
        >
          <section className="secondary_info">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: -50 }}
                animate={controls}
                style={{ opacity: opacityOfHeroHeading, y: YofHeroHeading }}
              >
                {headingContent}
              </motion.h2>
              {/* <p className="secondary_info_card">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
              <p className="secondary_info_card">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
              <p className="secondary_info_card">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
              <p className="secondary_info_card">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p> */}
            </div>
          </section>
        </motion.div>

        {/* <section className="card card-blue">
          <div className="product-image">
            <img
              src="https://i.ibb.co/0JKpmgd/blue.png"
              alt="OFF-white Blue Edition"
              draggable="false"
            />
          </div>
          <div className="product-info">
            <h2>Nike X OFF-white</h2>
            <p>Air Jordan 1 Retro High "Off-White - UNC" sneakers</p>
            <div className="price">$1599</div>
          </div>
          <div className="btn">
            <button className="buy-btn">Buy Now</button>
            <button className="fav">
              <svg
                className="svg"
                id="i-star"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                stroke="#000"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              >
                <path d="M16 2 L20 12 30 12 22 19 25 30 16 23 7 30 10 19 2 12 12 12 Z" />
              </svg>
            </button>
          </div>
        </section> */}
      </div>
    </div>
  );
};

export default FeatureProdcutCard;
