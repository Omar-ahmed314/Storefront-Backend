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
const database_1 = __importDefault(require("../database"));
class User {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = 'SELECT * FROM user_table';
                const result = yield connection.query(sql);
                connection.release();
                return result.rows;
            }
            catch (error) {
                throw new Error(`connection field at the index query with error ${error}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = 'SELECT * FROM user_table WHERE id = ($1)';
                const result = yield connection.query(sql, [id]);
                connection.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`connection field at the show query with error ${error}`);
            }
        });
    }
    create(User) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = 'INSERT INTO user_table (first_name, last_name, password) VALUES (($1), ($2), ($3)) RETURNING *';
                const result = yield connection.query(sql, [User.first_name, User.last_name, User.password]);
                connection.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Cannot create new user: error ${error}`);
            }
        });
    }
    edit(User) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = 'UPDATE user_table SET first_name = ($1), last_name = ($2),  password = ($3) WHERE id = ($4) RETURNING *';
                const result = yield connection.query(sql, [User.first_name, User.last_name, User.password, User.id]);
                connection.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Cannot edit the user: error ${error}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = 'DELETE FROM user_table WHERE id = ($1)';
                const result = yield connection.query(sql, [id]);
                connection.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Cannot delete the user: error ${error}`);
            }
        });
    }
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = 'DELETE FROM user_table;';
                const result = yield connection.query(sql);
                connection.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Cannot delete all the users: error ${error}`);
            }
        });
    }
}
exports.default = User;
