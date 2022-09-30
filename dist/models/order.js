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
class Order {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = 'SELECT * FROM order_table';
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
                const sql = 'SELECT * FROM order_table WHERE id = ($1)';
                const result = yield connection.query(sql, [id]);
                connection.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`connection field at the show query with error ${error}`);
            }
        });
    }
    create(Order) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = 'INSERT INTO order_table (user_id, status) VALUES (($1), ($2)) RETURNING *';
                const result = yield connection.query(sql, [Order.user_id, Order.status]);
                connection.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Cannot create new order: error ${error}`);
            }
        });
    }
    edit(Order) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = 'UPDATE order_table SET status = ($1) WHERE id = ($2) RETURNING *';
                const result = yield connection.query(sql, [Order.status, Order.id]);
                connection.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Cannot create new order: error ${error}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = 'DELETE FROM order_table WHERE id = ($1)';
                const result = yield connection.query(sql, [id]);
                connection.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Cannot create new order: error ${error}`);
            }
        });
    }
    addProductToOrder(orderId, productId, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = 'INSERT INTO order_product_table (order_id, product_id, quantity) VALUES (($1), ($2), ($3)) RETURNING *';
                const result = yield connection.query(sql, [orderId, productId, quantity]);
                connection.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Cannot insert new product into order: error ${error}`);
            }
        });
    }
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = 'DELETE FROM order_table;';
                const result = yield connection.query(sql);
                connection.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Cannot delete all the orders: error ${error}`);
            }
        });
    }
}
exports.default = Order;
