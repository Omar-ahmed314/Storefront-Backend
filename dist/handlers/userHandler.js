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
const user_1 = __importDefault(require("../models/user"));
const userHandlerMid_1 = require("./middleware/userHandlerMid");
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const userModel = new user_1.default();
// endpoints
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield userModel.index();
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
        const data = yield userModel.show(req.params.id);
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
        const userData = {
            id: 1,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: req.body.password
        };
        const data = yield userModel.create(userData);
        const token = jsonwebtoken_1.default.sign({
            user_id: data.id,
            first_name: data.first_name,
            last_name: data.last_name
        }, process.env.JSON_SECRET_KEY);
        res.status(200);
        res.setHeader('authorization', `Bearer ${token}`);
        res.json(data);
    }
    catch (error) {
        res.status(400);
        res.send(error);
    }
});
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = {
            id: req.body.id,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: req.body.password
        };
        const data = yield userModel.edit(userData);
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
        const data = yield userModel.delete(req.params.id);
        res.status(200);
        res.json(data);
    }
    catch (error) {
        res.status(400);
        res.send(error);
    }
});
const userRoutes = (app) => {
    app.get('/user', [userHandlerMid_1.tokenVerfication], index);
    app.get('/user/:id', [userHandlerMid_1.tokenVerfication], show);
    app.post('/user', [userHandlerMid_1.userValidation, userHandlerMid_1.userEncryption], create);
    app.put('/user', [userHandlerMid_1.tokenVerfication], edit);
    app.delete('/user/:id', [userHandlerMid_1.tokenVerfication], _delete);
};
exports.default = userRoutes;
