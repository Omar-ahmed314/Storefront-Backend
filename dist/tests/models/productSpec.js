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
const product_1 = __importDefault(require("../../models/product"));
const productModel = new product_1.default();
describe("Testing the product model", () => {
    let productTest;
    describe("Testing the index function", () => {
        it("The function should be declared", () => {
            expect(productModel.index).toBeDefined();
        });
        it("The table should be empty", () => __awaiter(void 0, void 0, void 0, function* () {
            const data = yield productModel.index();
            expect(data).toEqual([]);
        }));
    });
    describe("Testing the create function", () => {
        it("The function should be declared", () => {
            expect(productModel.create).toBeDefined();
        });
        it("The product should be created", () => __awaiter(void 0, void 0, void 0, function* () {
            const productData = {
                id: 1,
                title: 'oil',
                price: 10,
            };
            productTest = yield productModel.create(productData);
            expect(productTest).toBeDefined();
        }));
    });
    describe("Testing the show function", () => {
        it("The function should be declared", () => {
            expect(productModel.show).toBeDefined();
        });
        it("The product should be exist", () => __awaiter(void 0, void 0, void 0, function* () {
            const data = yield productModel.show(productTest.id);
            expect(data).toBeDefined();
        }));
    });
    describe("Testing the edit function", () => {
        it("The function should be declared", () => {
            expect(productModel.edit).toBeDefined();
        });
        it("The product should be updated", () => __awaiter(void 0, void 0, void 0, function* () {
            const productData = productTest;
            productData.price = 30;
            const data = yield productModel.edit(productData);
            expect(data).toBeDefined();
        }));
    });
    describe("Testing the delete function", () => {
        it("The function should be declared", () => {
            expect(productModel.delete).toBeDefined();
        });
        it("The product should be deleted", () => __awaiter(void 0, void 0, void 0, function* () {
            yield productModel.delete(productTest.id);
            const data = yield productModel.show(productTest.id);
            expect(data).toBeUndefined();
        }));
    });
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield productModel.deleteAll();
    }));
});
