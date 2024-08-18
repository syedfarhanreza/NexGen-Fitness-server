import { catchAsyncError } from "../../../utils/catchAsyncError";
import sendResponse from "../../../utils/sendResponse";
import { IProductOrder } from "./product.interface";
import Product from "./product.model";
import productService from "./product.service";

const {
  createProductService,
  getAllProductService,
  getSingleProductService,
  updateProductService,
  deleteProductByIdService,
  getFeaturedProductService,
} = productService;

export const createProduct = catchAsyncError(async (req, res) => {
  const { body } = req;
  const result = await createProductService(body);

  sendResponse(res, {
    message: "product created successfully",
    data: result,
    success: true,
  });
});
export const getAllProduct = catchAsyncError(async (req, res) => {
  const { result, totalDoc } = await getAllProductService(req.query);

  res.json({
    success: true,
    message: "successfully get all product",
    data: result,
    totalDoc,
  });
});
export const getFeaturedProduct = catchAsyncError(async (req, res) => {
  const result = await getFeaturedProductService(req.query);
  sendResponse(res, {
    success: true,
    data: result,
    message: "Successfully get featured products",
  });
});
export const getSingleProduct = catchAsyncError(async (req, res) => {
  const { id } = req.params;

  const result = await getSingleProductService(id);

  if (!result) {
    return sendResponse(res, {
      success: false,
      data: null,
      message: `No product found for ${id}`,
    });
  }

  res.json({
    success: true,
    message: "successfully get product",
    data: result,
  });
});

export const updateProductByIdController = catchAsyncError(async (req, res) => {
  const { id } = req.params;
  const isExist = await Product.findById(id);
  if (!isExist) {
    return sendResponse(res, {
      success: false,
      data: null,
      message: "Product not found",
      statusCode: 404,
    });
  }

  const result = await updateProductService(req.body, id);
  sendResponse(res, {
    data: result,
    success: true,
    message: "Successfully product updated",
  });
});
export const deleteProductByIdController = catchAsyncError(async (req, res) => {
  const { id } = req.params;
  const isExist = await Product.findById(id);
  if (!isExist) {
    return sendResponse(res, {
      success: false,
      data: null,
      message: "Product not found",
      statusCode: 404,
    });
  }

  const result = await deleteProductByIdService(id);
  sendResponse(res, {
    data: result,
    success: true,
    message: "Successfully deleted product",
  });
});

export const confirmManyProductOrderController = catchAsyncError(
  async (req, res) => {
    const cartItems = req.body.cartItems as IProductOrder[];
    for (const item of cartItems) {
      const product = await Product.findById(item._id);

      if (product) {
        // Check if there is enough stock
        if (product.stock >= item.quantity) {
          product.stock -= item.quantity;
          await product.save();
        } else {
          return sendResponse(res, {
            message: `Not enough stock for ${product.title}`,
            success: false,
            data: null,
            statusCode: 400,
          });
        }
      } else {
        return sendResponse(res, {
          message: `Product ${item._id} not found`,
          success: false,
          data: null,
          statusCode: 404,
        });
      }
    }

    sendResponse(res, {
      data: null,
      message: "successfully purchased products",
      success: true,
    });
  }
);
