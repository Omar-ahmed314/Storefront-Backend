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
const order_1 = __importDefault(require("../../models/order"));
const user_1 = __importDefault(require("../../models/user"));
const orderModel = new order_1.default();
describe("Testing the order model", () => {
    let userTest;
    let orderTest;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const userModel = new user_1.default();
        const userData = {
            id: 1,
            first_name: 'omar',
            last_name: 'ahmed',
            password: 'password123'
        };
        yield userModel.deleteAll();
        userTest = yield userModel.create(userData);
    }));
    describe("Testing the index function", () => {
        it("The function should be declared", () => {
            expect(orderModel.index).toBeDefined();
        });
        it("The table should be empty", () => __awaiter(void 0, void 0, void 0, function* () {
            const data = yield orderModel.index();
            expect(data).toEqual([]);
        }));
    });
    describe("Testing the create function", () => {
        it("The function should be declared", () => {
            expect(orderModel.create).toBeDefined();
        });
        it("The order should be created", () => __awaiter(void 0, void 0, void 0, function* () {
            const orderData = {
                id: 1,
                user_id: userTest.id,
                status: false,
            };
            orderTest = yield orderModel.create(orderData);
            expect(orderTest).toBeDefined();
        }));
    });
    describe("Testing the show function", () => {
        it("The function should be declared", () => {
            expect(orderModel.show).toBeDefined();
        });
        it("The order should be exist", () => __awaiter(void 0, void 0, void 0, function* () {
            const data = yield orderModel.show(orderTest.id);
            expect(data).toBeDefined();
        }));
    });
    describe("Testing the edit function", () => {
        it("The function should be declared", () => {
            expect(orderModel.edit).toBeDefined();
        });
        it("The order should be updated", () => __awaiter(void 0, void 0, void 0, function* () {
            // update the status of the previous created order
            const orderData = orderTest;
            orderData.status = true;
            const data = yield orderModel.edit(orderData);
            expect(data).toBeDefined();
        }));
    });
    describe("Testing the delete function", () => {
        it("The function should be declared", () => {
            expect(orderModel.delete).toBeDefined();
        });
        it("The order should be deleted", () => __awaiter(void 0, void 0, void 0, function* () {
            yield orderModel.delete(orderTest.id);
            const data = yield orderModel.show(orderTest.id);
            expect(data).toBeUndefined();
        }));
    });
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield orderModel.deleteAll();
    }));
});
