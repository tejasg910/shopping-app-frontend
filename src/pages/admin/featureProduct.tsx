import { motion } from "framer-motion";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import { userReducerInitialState } from "../../types/reducer_types";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useGetFeaturedProductQuery } from "../../redux/api/adminApi";
import { server } from "../../redux/store";
const FeatureProduct = () => {
  const { user } = useSelector(
    (state: { userReducer: userReducerInitialState }) => state.userReducer
  );

  const [featureProductUpdating, setFeatureProudctUpdating] = useState(false);
  const { data, refetch } = useGetFeaturedProductQuery(user?._id!);
  const [activeFeatureProduct, setActiveFeatureProduct] = useState(
    data?.data ? true : false
  );
  const [productId, setProductId] = useState("");
  const [discount, setDiscount] = useState(0);
  console.log(
    data?.data ? true : false,
    activeFeatureProduct,
    "this is feature data"
  );
  const handleUpdate = async () => {
    setFeatureProudctUpdating(true);
    // Logic to update email
    try {
      const { data } = await axios.put(
        `${
          import.meta.env.VITE_SERVER
        }/api/v1/admin/product/updateFeatureProduct/?id=${user?._id}`,
        { product: productId, discount }
      );
      console.log(data);
      refetch();
      setFeatureProudctUpdating(false);
      toast.success(data.message);
    } catch (error: any) {
      setFeatureProudctUpdating(false);
      console.log(error, "this is error");
      toast.error(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : "something went wrong"
      );
    }
  };
  const handleStatusUpdate = async () => {
    // Logic to update email
    try {
      const { data } = await axios.put(
        `${
          import.meta.env.VITE_SERVER
        }/api/v1/admin/product/updateFeatureProductStatus/?id=${user?._id}`,
        { product: productId, discount }
      );

      refetch();
      toast.success(data.message);
    } catch (error) {
      setFeatureProudctUpdating(false);
      console.log(error, "this is error");
      throw error;
    }
  };
  useEffect(() => {
    if (data?.data) {
      setActiveFeatureProduct(data.data.isActive);
      setProductId(data.data.product?._id || "");
      setDiscount(data?.data?.discount || 0);
    }
  }, [data]);
  return (
    <div className="admin-container">
      <AdminSidebar />

      <div className="feature_product_card_container_admin">
        <h2>Feature product management</h2>
        {/* <OfferCard /> */}
        {/* <div className="gradient_bar"></div> */}
        {data?.data && (
          <div className="container">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 500 }} // Initial animation properties
                animate={{ opacity: 1, y: 0 }} // Animation properties to animate to
                transition={{ duration: 0.5 }} // Duration of the animation
              >
                <section className="card">
                  <div className="product-image">
                    <img
                      src={server + "/" + data.data.product.image}
                      alt="OFF-white Red Edition"
                      draggable="false"
                    />
                  </div>
                  <div className="product-info">
                    <h2>{data.data.product.name}</h2>
                    <p>{data.data.product.category}</p>
                    <div className="price">{data.data.product.price}</div>
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
                </section>
              </motion.div>
            </div>
          </div>
        )}
        <div className="active_feature_product_container">
          <span>Show Feature product:</span>
          <div className="active_feature_product">
            <div className="toggle">
              <input
                checked={activeFeatureProduct}
                type="checkbox"
                onChange={(e) => {
                  setActiveFeatureProduct(e.target.checked);
                  handleStatusUpdate();
                  if (!data?.data?.product) {
                    toast.error("No product to show please add product");
                  }
                }}
                id="btn"
              />
              <label htmlFor="btn">
                <span className="track">
                  <span className="txt"></span>
                </span>
                <span className="thumb">|||</span>
              </label>
            </div>
          </div>
        </div>

        <div className="changefeature_product">
          <div className="product_section">
            <input
              onChange={(e) => setProductId(e.target.value)}
              value={productId}
              type="text"
              id="feature_product"
              placeholder="product id"
            />
          </div>
          <div className="discount_section">
            <input
              onChange={(e) => setDiscount(Number(e.target.value))}
              value={discount}
              type="number"
              id="discount"
              placeholder="discount"
            />
          </div>

          <div>
            <button onClick={handleUpdate}>
              {featureProductUpdating ? "changing" : "change"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureProduct;
