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
class miscQueries {
    getAllIncomplitedOrders(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = `select order_id, 
                            product_id, 
                            title,
                            price,
                            quantity,
                            status
                            from order_product_table as opt, 
                            product_table as pt, 
                            order_table as ot 
                            where ot.user_id = ($1)
                            and opt.order_id = ot.id
                            and opt.product_id = pt.id
                            order by (order_id)`;
                const result = yield connection.query(sql, [user_id]);
                connection.release();
                return result.rows;
            }
            catch (error) {
                throw new Error(`connection failed at the getAllIncomplitedOrders with error: ${error}`);
            }
        });
    }
    getUserByName(first_name, last_name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = 'SELECT * FROM user_table WHERE first_name = ($1) AND last_name = ($2)';
                const result = yield connection.query(sql, [first_name, last_name]);
                connection.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`connection failed at the getUserByName with error: ${error}`);
            }
        });
    }
}
exports.default = miscQueries;
