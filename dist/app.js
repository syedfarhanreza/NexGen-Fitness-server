"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripe = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const stripe_1 = __importDefault(require("stripe"));
const globalError_1 = __importDefault(require("./app/middleware/globalError"));
const not_found_1 = require("./app/middleware/not-found");
const routes_1 = __importDefault(require("./app/routes"));
const app = (0, express_1.default)();
exports.stripe = new stripe_1.default(process.env.STRIPE_SK);
// Middlewares
app.use((0, cors_1.default)({
    origin: "*",
}));
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.get("/", (req, res) => {
    res.send("Hello from server");
});
app.use("/api/v1", routes_1.default);
// 404 Handler
app.use(not_found_1.notFound);
app.use(globalError_1.default);
exports.default = app;
