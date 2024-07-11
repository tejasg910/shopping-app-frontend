export interface User {
  name: string;
  email: string;
  image: string;
  role: string;

  _id: string;
}

export interface Product {
  name: string;
  category: string;
  image: string;
  price: number;
  stock: number;
  _id: string;
}

export interface ShippingInfo {
  address: string;
  city: string;
  state: string;
  country: string;
  pinCode: string;
}
export interface CartItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  stock: number;
}

export type OrderDetails = {
  data: {
    shippingInfo: ShippingInfo;
    user: User;
    subTotal: number;
    tax: number;
    shippingCharges: number;
    discount: number;
    total: number;
    status: string;
    // name: { type: String, required: [true, "Plase enter name"] },
    products: [
      {
        product: Product;
        quantity: number;
      }
    ];

    paymentMode: string;
    paymentStatus: string;

    isDeleted: boolean;
  };
};
