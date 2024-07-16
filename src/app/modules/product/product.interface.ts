import { Model } from "mongoose";

export interface IProduct {
  name: string;
  price: number;
  stockQuantity: number;
  description: string;
  image: string;
  tag?: string;
  category: string;
  isDeleted: boolean;
}

export interface ProductModel extends Model<IProduct> {
  isProductExists(name: string, description: string): Promise<IProduct | null>;
}
