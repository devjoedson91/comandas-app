export type CategoryProps = {
  id: string;
  name: string;
};

export type ProductProps = {
  id: string;
  name: string;
  banner: string;
  description: string;
  price: string;
};

export type ItemProps = {
  id: string;
  product_id: string;
  name: string;
  amount: string | number;
};

export type UserProps = {
  id: string;
  name: string;
  email: string;
  token: string;
};

export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  banner: string;
  amount: number;
  total: number;
}

export interface UpdateProductAmount {
  productId: string;
  amount: number;
}
