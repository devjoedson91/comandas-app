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
