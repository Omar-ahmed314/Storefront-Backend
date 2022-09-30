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
const order_1 = __importDefault(require("../models/order"));
const userHandlerMid_1 = require("./middleware/userHandlerMid");
const orderModel = new order_1.default();
// endpoints
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield orderModel.index();
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
        const data = yield orderModel.show(req.params.id);
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
        const orderData = {
            id: 1,
            user_id: req.body.user_id,
            status: req.body.status
        };
        const data = yield orderModel.create(orderData);
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
        const orderData = {
            id: req.body.id,
            user_id: req.body.user_id,
            status: req.body.status
        };
        const data = yield orderModel.edit(orderData);
        res.status(200);
        res.json(data);
    }
    catch (error) {
        res.status(400);
        res.send(error);
    }
});
const addProductToOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { order_id, product_id, quantity } = req.body;
        const data = yield orderModel.addProductToOrder(order_id, product_id, quantity);
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
        const data = yield orderModel.delete(req.params.id);
        res.status(200);
        res.json(data);
    }
    catch (error) {
        res.status(400);
        res.send(error);
    }
});
const orderRoutes = (app) => {
    app.get('/order', [userHandlerMid_1.tokenVerfication], index);
    app.get('/order/:id', [userHandlerMid_1.tokenVerfication], show);
    app.post('/order', [userHandlerMid_1.tokenVerfication], create);
    app.put('/order', [userHandlerMid_1.tokenVerfication], edit);
    app.post('/order/product', [userHandlerMid_1.tokenVerfication], addProductToOrder);
    app.delete('/order/:id', [userHandlerMid_1.tokenVerfication], _delete);
};
exports.default = orderRoutes;
