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
const dotenv_1 = __importDefault(require("dotenv"));
const userHandlerMid_1 = require("./middleware/userHandlerMid");
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
    app.get('/user', index);
    app.get('/user/:id', show);
    app.post('/user', [userHandlerMid_1.userValidation, userHandlerMid_1.userEncryption], create);
    app.put('/user', edit);
    app.delete('/user/:id', _delete);
};
exports.default = userRoutes;
