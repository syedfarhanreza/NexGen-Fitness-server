"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../app/config"));
const createToken = (user, expires) => {
    return jsonwebtoken_1.default.sign(user, config_1.default.jwt_access_secret, {
        expiresIn: expires,
    });
};
exports.default = createToken;
