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
exports.userValidation = exports.userEncryption = void 0;
const services_1 = __importDefault(require("../../services/services"));
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
dotenv_1.default.config();
const userEncryption = (req, res, next) => {
    const hashedPassword = bcrypt_1.default.hashSync(req.body.password + process.env.SECRET_KEY, parseInt(process.env.SALT_ROUNDS));
    req.body.password = hashedPassword;
    next();
};
exports.userEncryption = userEncryption;
const userValidation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const miscQueriesModel = new services_1.default();
        const data = yield miscQueriesModel.getUserByName(req.body.first_name, req.body.last_name);
        if (data != undefined) {
            res.status(404);
            res.json({
                msg: "The user already exist"
            });
        }
        next();
    }
    catch (error) {
        res.status(500);
        res.send(error);
    }
});
exports.userValidation = userValidation;
