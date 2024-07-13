import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../../../redux/api/commonApi";
import { toast } from "react-hot-toast";
import Loading from "../../../components/loading";
import {
  useDeleteProductMutation,
  useUdpateProductMutation,
} from "../../../redux/api/adminApi";

import { showToast } from "../../../feature";
import { useSelector } from "react-redux";
import { userReducerInitialState } from "../../../types/reducer_types";

// const img =
//   "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=804";

const Productmanagement = () => {
  const navigate = useNavigate();
  const { user } = useSelector(
    (state: { userReducer: userReducerInitialState }) => state.userReducer
  );
  const { id } = useParams();

  console.log(id, "this is id");
  const { data, isError, isLoading } = useGetProductByIdQuery(id!);

  if (isError) toast.error("Something went wrong while fetching proudct");

  const [price, setPrice] = useState<number | null>(null);
  const [stock, setStock] = useState<number | null>(null);
  const [name, setName] = useState<string>("");
  const [photo, setPhoto] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  const [isUpdating, setIsUpdating] = useState(false);

  const [priceUpdate, setPriceUpdate] = useState<number>(price!);
  const [stockUpdate, setStockUpdate] = useState<number>(stock!);
  const [nameUpdate, setNameUpdate] = useState<string>(name);
  const [categoryUpdate, setCategoryUpdate] = useState<string>(category);
  const [photoUpdate, setPhotoUpdate] = useState<string>(photo);
  const [photoFile, setPhotoFile] = useState<File>();
  const [updateProduct] = useUdpateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];

    const reader: FileReader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPhotoUpdate(reader.result);
          setPhotoFile(file);
        }
      };
    }
  };

  useEffect(() => {
    setNameUpdate(data?.data.name!);
    setPriceUpdate(data?.data.price!);
    setStockUpdate(data?.data.stock!);
    setPhotoUpdate( data?.data.image!);
    setCategoryUpdate(data?.data?.category!);
    setName(data?.data.name!);
    setPrice(data?.data.price!);
    setStock(data?.data.stock!);
    setPhoto( data?.data.image!);
    setCategory(data?.data?.category!);
  }, [data]);

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUpdating(true);
    setName(nameUpdate);
    setPrice(priceUpdate);
    setStock(stockUpdate);
    setPhoto(photoUpdate);
    const formData = new FormData();
    formData.append("name", nameUpdate);
    formData.append("stock", stockUpdate.toString());
    formData.append("category", categoryUpdate);
    formData.append("price", priceUpdate.toString());
    formData.append("image", photoFile!);

    const res = await updateProduct({
      productId: id!,
      id: user?._id!,
      formData,
    });
    setIsUpdating(false);
    showToast(res, null, "");
  };

  const deleteHandler = async () => {
    const res = await deleteProduct({
      productId: id!,
      id: user?._id!,
    });

    showToast(res, navigate, "/admin/product");
  };

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        {isLoading ? (
          <Loading />
        ) : (
          <section>
            <strong>ID - {data?.data._id}</strong>
            <img src={photo} alt="Product" />
            <p>{name}</p>
            {stock && stock > 0 ? (
              <span className="green">{stock} Available</span>
            ) : (
              <span className="red"> Not Available</span>
            )}
            <h3>₹{price}</h3>
          </section>
        )}

        <article>
          <button className="product-delete-btn">
            <span onClick={deleteHandler}>
              <FaTrash />
            </span>
          </button>
          <form onSubmit={submitHandler}>
            <h2>Manage</h2>
            <div>
              <label>Name</label>
              <input
                required
                type="text"
                placeholder="Name"
                value={nameUpdate}
                onChange={(e) => setNameUpdate(e.target.value)}
              />
            </div>
            <div>
              <label>Price</label>
              <input
                required
                type="number"
                placeholder="Price"
                value={priceUpdate}
                onChange={(e) => setPriceUpdate(Number(e.target.value))}
              />
            </div>
            <div>
              <label>Stock</label>
              <input
                required
                type="number"
                placeholder="Stock"
                value={stockUpdate}
                onChange={(e) => setStockUpdate(Number(e.target.value))}
              />
            </div>

            <div>
              <label>Category</label>
              <input
                required
                type="text"
                placeholder="eg. laptop, camera etc"
                value={categoryUpdate}
                onChange={(e) => setCategoryUpdate(e.target.value)}
              />
            </div>

            <div>
              <label>Photo</label>
              <input type="file" onChange={changeImageHandler} />
            </div>

            {photoUpdate && <img src={photoUpdate} alt="New Image" />}
            <button disabled={isUpdating} type="submit">
              {isUpdating ? "Updating" : "Update"}
            </button>
          </form>
        </article>
      </main>
    </div>
  );
};

export default Productmanagement;
