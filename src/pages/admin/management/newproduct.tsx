import { ChangeEvent, FormEvent, useState } from "react";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { useNewProductMutation } from "../../../redux/api/adminApi";
import { useSelector } from "react-redux";
import { userReducerInitialState } from "../../../types/reducer_types";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../../feature";
import { controllers } from "chart.js";

const NewProduct = () => {
  const navigate = useNavigate();
  const { user } = useSelector(
    (state: { userReducer: userReducerInitialState }) => state.userReducer
  );
  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [price, setPrice] = useState<number>(1000);
  const [stock, setStock] = useState<number>(1);
  const [photoPrev, setPhotoPrev] = useState<string>("");
  const [photo, setPhoto] = useState<File | null>();
  const [newProduct] = useNewProductMutation();

  const [isProductLoading, setIsProductLoading] = useState(false);
  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];
    if (file && file.size > 1 * 1024 * 1024) {
      toast.error("File size should be less than 1 MB.");
     
      return;
    }

    console.log(file, "this is file");

    if (file && !["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
      toast.error("Only image files (jpeg, png) are allowed.");
     
      return;
    }
    const reader: FileReader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPhotoPrev(reader.result);
          setPhoto(file);
        }
      };
    }
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (!name || !category || !price || !stock || !photo)
        return toast.error("All fields are required");

      setIsProductLoading(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("category", category);
      formData.append("price", price.toString());
      formData.append("stock", stock.toString());
      formData.append("image", photo!);

      const res = await newProduct({ id: user?._id!, formData });
      showToast(res, navigate, "/admin/product");
      setIsProductLoading(false);
    } catch (error: any) {
      console.log(error?.message!, error?.response?.data?.message!);
    }
  };
  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        <article>
          <form onSubmit={submitHandler}>
            <h2>New Product</h2>
            <div>
              <label>Name</label>
              <input
                required
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label>Price</label>
              <input
                required
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>
            <div>
              <label>Stock</label>
              <input
                required
                type="number"
                placeholder="Stock"
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
              />
            </div>

            <div>
              <label>Category</label>
              <input
                type="text"
                id="fileInput"
                placeholder="eg. laptop, camera etc"
                value={category}
                accept="image/jpeg,image/png"
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>

            <div>
              <label>Photo</label>
              <input required type="file" onChange={changeImageHandler} />
            </div>

            {photoPrev && <img src={photoPrev} alt="New Image" />}
            <button type="submit">
              {isProductLoading ? "please wait" : "create"}
            </button>
          </form>
        </article>
      </main>
    </div>
  );
};

export default NewProduct;
