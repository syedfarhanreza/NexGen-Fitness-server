"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmManyProductOrderController = exports.deleteProductByIdController = exports.updateProductByIdController = exports.getSingleProduct = exports.getFeaturedProduct = exports.getAllProduct = exports.createProduct = void 0;
const catchAsyncError_1 = require("../../../utils/catchAsyncError");
const sendResponse_1 = __importDefault(require("../../../utils/sendResponse"));
const product_model_1 = __importDefault(require("./product.model"));
const product_service_1 = __importDefault(require("./product.service"));
const { createProductService, getAllProductService, getSingleProductService, updateProductService, deleteProductByIdService, getFeaturedProductService, } = product_service_1.default;
exports.createProduct = (0, catchAsyncError_1.catchAsyncError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const result = yield createProductService(body);
    (0, sendResponse_1.default)(res, {
        message: "product created successfully",
        data: result,
        success: true,
    });
}));
exports.getAllProduct = (0, catchAsyncError_1.catchAsyncError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { result, totalDoc } = yield getAllProductService(req.query);
    res.json({
        success: true,
        message: "successfully get all product",
        data: result,
        totalDoc,
    });
}));
exports.getFeaturedProduct = (0, catchAsyncError_1.catchAsyncError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield getFeaturedProductService(req.query);
    (0, sendResponse_1.default)(res, {
        success: true,
        data: result,
        message: "Successfully get featured products",
    });
}));
exports.getSingleProduct = (0, catchAsyncError_1.catchAsyncError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield getSingleProductService(id);
    if (!result) {
        return (0, sendResponse_1.default)(res, {
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
}));
exports.updateProductByIdController = (0, catchAsyncError_1.catchAsyncError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const isExist = yield product_model_1.default.findById(id);
    if (!isExist) {
        return (0, sendResponse_1.default)(res, {
            success: false,
            data: null,
            message: "Product not found",
            statusCode: 404,
        });
    }
    const result = yield updateProductService(req.body, id);
    (0, sendResponse_1.default)(res, {
        data: result,
        success: true,
        message: "Successfully product updated",
    });
}));
exports.deleteProductByIdController = (0, catchAsyncError_1.catchAsyncError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const isExist = yield product_model_1.default.findById(id);
    if (!isExist) {
        return (0, sendResponse_1.default)(res, {
            success: false,
            data: null,
            message: "Product not found",
            statusCode: 404,
        });
    }
    const result = yield deleteProductByIdService(id);
    (0, sendResponse_1.default)(res, {
        data: result,
        success: true,
        message: "Successfully deleted product",
    });
}));
exports.confirmManyProductOrderController = (0, catchAsyncError_1.catchAsyncError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cartItems = req.body.cartItems;
    for (const item of cartItems) {
        const product = yield product_model_1.default.findById(item._id);
        if (product) {
            // Check if there is enough stock
            if (product.stock >= item.quantity) {
                product.stock -= item.quantity;
                yield product.save();
            }
            else {
                return (0, sendResponse_1.default)(res, {
                    message: `Not enough stock for ${product.title}`,
                    success: false,
                    data: null,
                    statusCode: 400,
                });
            }
        }
        else {
            return (0, sendResponse_1.default)(res, {
                message: `Product ${item._id} not found`,
                success: false,
                data: null,
                statusCode: 404,
            });
        }
    }
    (0, sendResponse_1.default)(res, {
        data: null,
        message: "successfully purchased products",
        success: true,
    });
}));
