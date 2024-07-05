import { FaPlus } from "react-icons/fa";
import { CartItem } from "../types/types";
type ProductsProps = {
  image: string;
  name: string;
  price: number;
  productId: string;
  stock: number;

  handler: (cartItem: CartItem) => void;
};

const ProductCard = ({
  image,
  name,
  price,
  productId,
  stock,
  handler,
}: ProductsProps) => {
  return (
    <div className="productCard">
      <img src={image} alt={name} />
      <p>{name}</p>
      <span>${price}</span>
      <div>
        <button
          onClick={() =>
            handler({ image, name, price, productId, quantity: 1, stock })
          }
        >
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
