import React from "react";
import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../../redux/api/commonApi";
import { showToast } from "../../feature";
import { toast } from "react-hot-toast";
import { SkeletonLoading } from "../loading";

const ProductInfo = () => {
  const { id } = useParams();
  const { isLoading, isError, data } = useGetProductByIdQuery(id!);
  console.log(data, "this is data");
  if (isError) toast.error("Error while fetching product");

  return (
    <div className="product_info">
      {isLoading ? (
        <SkeletonLoading />
      ) : (
        <main>
          <div className="card">
            <div className="card__title">
              <div className="icon">
                <a href="#">
                  <i className="fa fa-arrow-left"></i>
                </a>
              </div>
              <h3>{data?.data.category}</h3>
            </div>
            <div className="card__body">
              <div className="half first_half">
                <div className="featured_text">
                  <h1>{data?.data.name.split(" ")[0]}</h1>
                  {data &&
                  data.data.name &&
                  data?.data.name.split(" ").length > 1 ? (
                    <p className="sub">
                      {data?.data.name.split(" ").slice(1).join(" ")}
                    </p>
                  ) : (
                    <p className="sub"></p>
                  )}
                  <p className="price">$210.00</p>
                </div>
                <div className="suggestions">
                  <div className="recommend">
                    <p>Recommended by</p>
                    <h3>Andrew Palmer</h3>
                  </div>
                  <div className="action">
                    <button type="button">Add to cart</button>
                  </div>
                </div>
                {/* <div className="image">
                  <img
                    src="https://images-na.ssl-images-amazon.com/images/I/613A7vcgJ4L._SL1500_.jpg"
                    alt=""
                  />
                </div> */}
              </div>
              <div className="half">
                <div className="description">
                  <p>{data?.data._id}</p>
                </div>
                <span className="stock">
                  <i className="fa fa-pen"></i> In stock
                </span>
                <div className="reviews">
                  <ul className="stars">
                    <li>
                      <i className="fa fa-star"></i>
                    </li>
                    <li>
                      <i className="fa fa-star"></i>
                    </li>
                    <li>
                      <i className="fa fa-star"></i>
                    </li>
                    <li>
                      <i className="fa fa-star"></i>
                    </li>
                    <li>
                      <i className="fa fa-star-o"></i>
                    </li>
                  </ul>
                  <span>(64 reviews)</span>
                </div>
                <div className="image">
                  <img
                    src="https://images-na.ssl-images-amazon.com/images/I/613A7vcgJ4L._SL1500_.jpg"
                    alt=""
                  />
                </div>
              </div>
            </div>
            {/* <div className="card__footer">
              <div className="recommend">
                <p>Recommended by</p>
                <h3>Andrew Palmer</h3>
              </div>
              <div className="action">
                <button type="button">Add to cart</button>
              </div>
            </div> */}
          </div>
        </main>
      )}
    </div>
  );
};

export default ProductInfo;
