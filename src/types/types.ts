export interface User {
  name: string;
  email: string;
  image: string;
  gender: string;
  role: string;
  dob: string;
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
