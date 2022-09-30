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
const product_1 = __importDefault(require("../models/product"));
const userHandlerMid_1 = require("./middleware/userHandlerMid");
const productModel = new product_1.default();
// endpoints
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield productModel.index();
        res.status(200);
        res.json(data);
    }
    catch (error) {
        res.status(500);
        res.send(error);
    }
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield productModel.show(req.params.id);
        res.status(200);
        res.json(data);
    }
    catch (error) {
        res.status(500);
        res.send(error);
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productData = {
            id: 1,
            title: req.body.title,
            price: req.body.price
        };
        const data = yield productModel.create(productData);
        res.status(200);
        res.json(data);
    }
    catch (error) {
        res.status(400);
        res.send(error);
    }
});
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productData = {
            id: req.body.id,
            title: req.body.title,
            price: req.body.price
        };
        const data = yield productModel.edit(productData);
        res.status(200);
        res.json(data);
    }
    catch (error) {
        res.status(400);
        res.send(error);
    }
});
const _delete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield productModel.delete(req.params.id);
        res.status(200);
        res.json(data);
    }
    catch (error) {
        res.status(400);
        res.send(error);
    }
});
const productRoutes = (app) => {
    app.get('/product', index);
    app.get('/product/:id', show);
    app.post('/product', [userHandlerMid_1.tokenVerfication], create);
    app.put('/product', [userHandlerMid_1.tokenVerfication], edit);
    app.delete('/product/:id', [userHandlerMid_1.tokenVerfication], _delete);
};
exports.default = productRoutes;
