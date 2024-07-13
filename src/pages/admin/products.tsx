import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { useGetAllProductsQuery } from "../../redux/api/adminApi";
import { server } from "../../redux/store";
import { useSelector } from "react-redux";
import { userReducerInitialState } from "../../types/reducer_types";
import { SkeletonLoading } from "../../components/loading";
import { toast } from "react-hot-toast";

// const img =
//   "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=804";

// const img2 = "https://m.media-amazon.com/images/I/514T0SvwkHL._SL1500_.jpg";

// const arr: Array<DataType> = [
//   {
//     photo: <img src={img} alt="Shoes" />,
//     name: "Puma Shoes Air Jordan Cook Nigga 2023",
//     price: 690,
//     stock: 3,
//     action: <Link to="/admin/product/sajknaskd">Manage</Link>,
//   },

//   {
//     photo: <img src={img2} alt="Shoes" />,
//     name: "Macbook",
//     price: 232223,
//     stock: 213,
//     action: <Link to="/admin/product/sdaskdnkasjdn">Manage</Link>,
//   },
// ];

const Products = () => {
  const { user } = useSelector(
    (state: { userReducer: userReducerInitialState }) => state.userReducer
  );

  const { data, isError, isLoading } = useGetAllProductsQuery(user?._id!);
  if (isError) toast.error("Something went wrong while fetching products");

  return (
    <div className="admin-container">
      <AdminSidebar />

      <main>
        {isLoading ? (
          <SkeletonLoading />
        ) : (
          <div className="main_product_table_container">
            <div className="product_table_container">
              <div className="container">
                <h2>Products</h2>
                <ul className="responsive-table">
                  <li className="table-header">
                    <div className="col col-2">Image</div>
                    <div className="col col-3">Name</div>
                    <div className="col col-4">Price</div>
                    <div className="col col-4">Stock</div>
                    <div className="col col-4">Action</div>
                  </li>
                  {data?.data.map((product) => {
                    return (
                      <li className="table-row">
                        <div className="col col-2" data-label="Customer Name">
                          <img
                            src={ product.image}
                            alt=""
                            width={50}
                            height={50}
                          />
                        </div>
                        <div className="col col-3" data-label="Amount">
                          {product?.name}
                        </div>
                        <div className="col col-4" data-label="Payment Status">
                          {product?.price}
                        </div>
                        <div className="col col-4" data-label="Payment Status">
                          {product?.stock}
                        </div>

                        <div className="col col-4" data-label="Payment Status">
                          <Link to={`/admin/product/${product._id}`}>
                            <button className="btn">Manage</button>
                          </Link>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        )}
      </main>
      <Link to="/admin/product/new" className="create-product-btn">
        <FaPlus />
      </Link>
    </div>
  );
};

export default Products;
