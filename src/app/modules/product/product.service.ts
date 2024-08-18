/* eslint-disable @typescript-eslint/no-explicit-any */
import QueryBuilder from "../../builder/QueryBuilder";
import { IProduct } from "./product.interface";
import Product from "./product.model";

const createProductService = async (payload: IProduct) => {
  const result = await Product.create(payload);
  return result;
};

const getAllProductService = async (query: Record<string, unknown>) => {
  const { min, max, category } = query;

  const minPrice = min ? parseInt(min as string) : 0;
  const maxPrice = max ? parseInt(max as string) : 0;
  const filter: Record<string, any> = {};
  const categoryArr = category ? (category as string).trim().split(",") : [];

  if (minPrice && maxPrice) {
    filter.price = { $gte: minPrice, $lte: maxPrice };
  } else if (minPrice) {
    filter.price = { $gte: minPrice };
  } else if (maxPrice) {
    filter.price = { $lte: maxPrice };
  }

  if (category && category !== " ") {
    filter.category = {
      $in: categoryArr.map((cat) => new RegExp(`^${cat}$`, "i")),
    };
  }

  const queryModel = Product.find(filter);
  const queryBuild = new QueryBuilder(queryModel, query)
    .paginate()
    .sort()
    .search(["title"]);

  const total = await queryBuild.count();

  const result = await queryBuild.modelQuery;

  return { result, totalDoc: total.totalCount };
};

const getSingleProductService = async (id: string) => {
  const result = await Product.findById(id);
  return result;
};
const getFeaturedProductService = async (query: Record<string, unknown>) => {
  const limit = Number(query.limit || 4);
  const result = await Product.find().sort({ createdAt: -1 }).limit(limit);
  return result;
};

const updateProductService = async (
  payload: Partial<IProduct>,
  productId: string,
) => {
  const result = await Product.findByIdAndUpdate(productId, payload, {
    new: true,
  });
  return result;
};
const deleteProductByIdService = async (productId: string) => {
  const result = await Product.findByIdAndDelete(productId);
  return result;
};

const productService = {
  createProductService,
  getAllProductService,
  getSingleProductService,
  updateProductService,
  deleteProductByIdService,
  getFeaturedProductService,
};
export default productService;
