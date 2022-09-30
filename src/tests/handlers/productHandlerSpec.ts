import app from "../../server";
import supertest from "supertest";
import { product } from "../../models/product";
const superTest = supertest(app);


describe("Testing product routes", () => {
    let productTest: product;
    describe("Testing index endpoint", () => {
        it("should return empty array", async () => {
            const data = await superTest.get('/product');
            expect(data.body).toEqual([]);
        });
    });

    describe("Testing create endpoint", () => {
        it("should return the created product", async () => {
            const data = await superTest.post('/product').send({
                title: 'rice',
                price: 30
            });
            productTest = data.body;
            expect(data.status).toEqual(200);
        });
    });

    describe("Testing show endpoint", () => {
        it("should return the needed product", async () => {
            const data = await superTest.get(`/product/${productTest.id}`);
            expect(data.status).toEqual(200);
        });
    });

    describe("Testing edit endpoint", () => {
        it("should edit the needed product", async () => {
            const data = await superTest.put(`/product`).send({
                id: productTest.id,
                title: 'rice',
                price: 40
            });
            productTest = data.body;
            expect(data.status).toEqual(200);
        });
    });

    describe("Testing delete endpoint", () => {
        it("should delete the needed product", async () => {
            const data = await superTest.delete(`/product/${productTest.id}`);
            expect(data.status).toEqual(200);
        });
    });
});