export interface IProduct {
  image: string;
  title: string;
  price: number;
  stock: number;
  details: string;
  category: string;
  tag?: string;
}

export interface IProductOrder {
  quantity: number;
  _id: string;
}
