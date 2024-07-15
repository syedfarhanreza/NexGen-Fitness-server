import { Schema, model } from "mongoose";
import { IProduct, ProductModel } from "./product.interface";

const productSchema = new Schema<IProduct, ProductModel>(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stockQuantity: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
      default: "",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
productSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

productSchema.statics.isProductExists = async function (
  name: string,
  description: string
) {
  return await Product.findOne({ name, description });
};

export const Product = model<IProduct, ProductModel>("Product", productSchema);
