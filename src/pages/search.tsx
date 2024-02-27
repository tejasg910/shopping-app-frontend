import { setsEqual } from "chart.js/helpers";
import React, { ChangeEvent, useState } from "react";
import ProductCard from "../components/productcard";

const Search = () => {
  const [search, setSearch] = useState<string>("");

  const [sort, setSort] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState(100000);
  const [minPrice, setMinPrice] = useState<number>(1);
  const [category, setCategory] = useState<string>("all");
  const [page, setPage] = useState<number>(1);

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
            max={1000000}
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
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">All</option>
            <option value="camera">camera</option>
            <option value="laptop">laptop</option>
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
        <div className="search-product-lists">
          <ProductCard
            productId="2sfsdfsd"
            price={20}
            stock={10}
            image="https://rukminim2.flixcart.com/image/416/416/xif0q/computer/y/l/p/-original-imagqmqjv5cyvbup.jpeg?q=70&crop=false"
            handler={addToCartHandler}
            name="ACER"
          />
        </div>
        <article>
          <button
            onClick={() => setPage((prev) => prev - 1)}
            disabled={page <= 1}
          >
            Previous
          </button>
          <span>{page} of 4</span>
          <button
            disabled={page >= 4}
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
