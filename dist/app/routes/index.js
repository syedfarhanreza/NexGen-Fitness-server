"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const payment_route_1 = __importDefault(require("../Modules/Payment/payment.route"));
const product_route_1 = require("../Modules/Product/product.route");
const router = express_1.default.Router();
const moduleRoute = [
    {
        path: "/product",
        route: product_route_1.ProductRoutes,
    },
    {
        path: "/payment",
        route: payment_route_1.default,
    },
];
moduleRoute.forEach((route) => router.use(route.path, route.route));
exports.default = router;
