import { useEffect, useState } from "react";
import ProductCard from "../components/productcard";
import {
  useGetAllCategoriesQuery,
  useSearchProductsQuery,
} from "../redux/api/commonApi";
import { toast } from "react-hot-toast";

import { server } from "../redux/store";
import { SkeletonLoading } from "../components/loading";

const Search = () => {
  const [search, setSearch] = useState<string>("");
  const {
    data: categoriesResponse,
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useGetAllCategoriesQuery("");
  if (categoriesError)
    toast.error("Something went wrong while fetching categories");

  const [sort, setSort] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState(100000);
  const [minPrice, setMinPrice] = useState<number>(1);
  const [category, setCategory] = useState<string>("all");
  const [page, setPage] = useState<number>(1);
  const { data, isError, isLoading } = useSearchProductsQuery({
    search,
    page,
    price: maxPrice,
    category,
    sort,
  });
  if (isError) toast.error("Something went wrong while search");

  const addToCartHandler = () => {};
  return (
    <div className="product-search-page">
      <aside>
        <h2>Filters</h2>
        <div>
          <h4>Sort</h4>
          <select
            name="sort"
            id=""
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">None</option>
            <option value="asc">Price (Low to high)</option>
            <option value="dsc">Price (High to Low)</option>
          </select>
        </div>
        <div>
          <h4>Max Price : {maxPrice || ""}</h4>
          <input
            type="range"
            name="maxprice"
            id=""
            min={10}
            max={10000}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </div>
        <div>
          <h4>Category</h4>
          <select
            name="category"
            id=""
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
          >
            <option value="all">All</option>
            {!categoriesLoading &&
              categoriesResponse?.data.map((category) => {
                return <option value={category}>{category}</option>;
              })}
          </select>
        </div>
      </aside>
      <main>
        <h1>Products</h1>
        <input
          type="text"
          placeholder="Search Products by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="search-product-list">
          {isLoading ? (
            <SkeletonLoading />
          ) : (
            data?.data.map((product) => (
              <ProductCard
                productId={product._id}
                price={product.price}
                stock={product.stock}
                image={server + "/" + product.image}
                handler={addToCartHandler}
                name={product.name}
              />
            ))
          )}
        </div>
        <article>
          <button
            onClick={() => setPage((prev) => prev - 1)}
            disabled={page <= 1}
          >
            Previous
          </button>
          <span>
            {page} of {data?.totalPages}
          </span>
          <button
            disabled={page >= data?.totalPages!}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </button>
        </article>
      </main>
    </div>
  );
};

export default Search;
