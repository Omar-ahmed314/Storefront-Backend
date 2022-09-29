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
const user_1 = __importDefault(require("../../models/user"));
const userModel = new user_1.default();
describe("Testing the user model", () => {
    describe("Testing the index function", () => {
        it("The function should be declared", () => {
            expect(userModel.index).toBeDefined();
        });
        it("The table should be empty", () => __awaiter(void 0, void 0, void 0, function* () {
            const data = yield userModel.index();
            expect(data).toEqual([]);
        }));
    });
    describe("Testing the create function", () => {
        it("The function should be declared", () => {
            expect(userModel.create).toBeDefined();
        });
        it("The user should be created", () => __awaiter(void 0, void 0, void 0, function* () {
            const userData = {
                first_name: 'omar',
                last_name: 'ahmed',
                password: 'password123'
            };
            const { first_name, last_name, password } = yield userModel.create(userData);
            expect({ first_name, last_name, password }).toEqual({ first_name: 'omar', last_name: 'ahmed', password: 'password123' });
        }));
    });
    describe("Testing the show function", () => {
        it("The function should be declared", () => {
            expect(userModel.show).toBeDefined();
        });
        it("The user id (1) should be existed", () => __awaiter(void 0, void 0, void 0, function* () {
            const userData = {
                first_name: 'omar',
                last_name: 'ahmed',
                password: 'password123'
            };
            // await userModel.create(userData);
            const data = yield userModel.show(1);
            expect(data).toBeDefined();
        }));
    });
    describe("Testing the edit function", () => {
        it("The function should be declared", () => {
            expect(userModel.edit).toBeDefined();
        });
        it("The user id (1) should be updated", () => __awaiter(void 0, void 0, void 0, function* () {
            const userData = {
                id: 1,
                first_name: 'samer',
                last_name: 'ahmed',
                password: 'hspc'
            };
            // await userModel.create(userData);
            yield userModel.edit(userData);
            const { first_name, last_name, password } = yield userModel.show(1);
            expect({ first_name, last_name, password }).toEqual({ first_name: 'samer', last_name: 'ahmed', password: 'hspc' });
        }));
    });
    describe("Testing the delete function", () => {
        it("The function should be declared", () => {
            expect(userModel.delete).toBeDefined();
        });
        it("The user id (1) should be deleted", () => __awaiter(void 0, void 0, void 0, function* () {
            yield userModel.delete(1);
            const data = yield userModel.show(1);
            expect(data).toBeUndefined();
        }));
    });
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield userModel.deleteAll();
    }));
});
