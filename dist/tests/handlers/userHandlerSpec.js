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
describe("Testing user routes", () => {
    let userTest;
    describe("Testing index endpoint", () => {
        it("should return empty array", () => __awaiter(void 0, void 0, void 0, function* () {
            const data = yield superTest.get('/user');
            expect(data.body).toEqual([]);
        }));
    });
    describe("Testing create endpoint", () => {
        it("should return the created user", () => __awaiter(void 0, void 0, void 0, function* () {
            const data = yield superTest.post('/user').send({
                first_name: 'omar',
                last_name: 'ahmed',
                password: 'password123'
            });
            userTest = data.body;
            expect(data.status).toEqual(200);
        }));
    });
    describe("Testing show endpoint", () => {
        it("should return the needed user", () => __awaiter(void 0, void 0, void 0, function* () {
            const data = yield superTest.get(`/user/${userTest.id}`);
            expect(data.status).toEqual(200);
        }));
    });
    describe("Testing edit endpoint", () => {
        it("should edit the needed user", () => __awaiter(void 0, void 0, void 0, function* () {
            const data = yield superTest.put(`/user`).send({
                id: userTest.id,
                first_name: 'omar',
                last_name: 'ahmed',
                password: 'password234'
            });
            userTest = data.body;
            expect(data.status).toEqual(200);
        }));
    });
    describe("Testing delete endpoint", () => {
        it("should delete the needed user", () => __awaiter(void 0, void 0, void 0, function* () {
            const data = yield superTest.delete(`/user/${userTest.id}`);
            expect(data.status).toEqual(200);
        }));
    });
});