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
const services_1 = __importDefault(require("../services/services"));
const userHandlerMid_1 = require("./middleware/userHandlerMid");
const miscQueriesModel = new services_1.default();
// endpoints
const incomplitedOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield miscQueriesModel.getAllIncomplitedOrders(req.body.id);
        res.status(200);
        res.json(data);
    }
    catch (error) {
        res.status(404);
        res.send(error);
    }
});
const servicesRoutes = (app) => {
    app.get('/all_incomplited_orders', [userHandlerMid_1.tokenVerfication], incomplitedOrders);
};
exports.default = servicesRoutes;
