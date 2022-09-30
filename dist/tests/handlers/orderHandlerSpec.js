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
const server_1 = __importDefault(require("../../server"));
const supertest_1 = __importDefault(require("supertest"));
const superTest = (0, supertest_1.default)(server_1.default);
describe("Testing order routes", () => {
    let orderTest;
    let userTest;
    let token;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield superTest.post('/user').send({
            first_name: 'omar',
            last_name: 'ahmed',
            password: 'password123'
        });
        userTest = data.body;
        token = data.headers.authorization;
    }));
    describe("Testing index endpoint", () => {
        it("should return empty array", () => __awaiter(void 0, void 0, void 0, function* () {
            const data = yield superTest.get('/order')
                .set('authorization', token);
            expect(data.body).toEqual([]);
        }));
    });
    describe("Testing create endpoint", () => {
        it("should return the created order", () => __awaiter(void 0, void 0, void 0, function* () {
            const data = yield superTest.post('/order')
                .set('authorization', token)
                .send({
                user_id: userTest.id,
                status: false
            });
            orderTest = data.body;
            expect(data.status).toEqual(200);
        }));
    });
    describe("Testing show endpoint", () => {
        it("should return the needed order", () => __awaiter(void 0, void 0, void 0, function* () {
            const data = yield superTest.get(`/order/${orderTest.id}`)
                .set('authorization', token);
            expect(data.status).toEqual(200);
        }));
    });
    describe("Testing edit endpoint", () => {
        it("should edit the needed order", () => __awaiter(void 0, void 0, void 0, function* () {
            const data = yield superTest.put(`/order`)
                .set('authorization', token)
                .send({
                id: orderTest.id,
                user_id: userTest.id,
                status: true
            });
            orderTest = data.body;
            expect(data.status).toEqual(200);
        }));
    });
    describe("Testing delete endpoint", () => {
        it("should delete the needed order", () => __awaiter(void 0, void 0, void 0, function* () {
            const data = yield superTest.delete(`/order/${orderTest.id}`)
                .set('authorization', token);
            expect(data.status).toEqual(200);
        }));
    });
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield superTest.delete(`/user/${userTest.id}`)
            .set('authorization', token);
    }));
});
