import React from "react";

const ProductDetails = () => {
  return (
    <div className="edit_product_details_container">
      <div className="heading">
        <h1>Edit product</h1>
        <hr />
      </div>

      <div className="input_container">
        <h3 className="product_name">Product name</h3>
        <div className="quantity">
          <button>-</button>
          <span>quantity: 1</span>
          <button>+</button>
        </div>

        <div className="price_input">
          <input type="number" placeholder="Price" min={0} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
