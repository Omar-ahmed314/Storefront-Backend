import Product, { product } from "../../models/product";

const productModel = new Product();

describe("Testing the product model", () => {
    describe("Testing the index function", () => {
        it("The function should be declared", () => {
            expect(productModel.index).toBeDefined();
        });
        it("The table should be empty", async () => {
            const data = await productModel.index();
            expect(data).toEqual([]);
        });
    });

    describe("Testing the create function", () => {
        it("The function should be declared", () => {
            expect(productModel.create).toBeDefined();
        });
        it("The product should be created", async () => {
            const productData: product = {
                title: 'oil',
                price: 10,
            };
            const data = await productModel.create(productData);
            expect(data).toBeDefined();
        });
    });

    describe("Testing the show function", () => {
        it("The function should be declared", () => {
            expect(productModel.show).toBeDefined();
        });
        it("The product id (1) should be exist", async () => {
            const data = await productModel.show(1);
            expect(data).toBeDefined();
        });
    });

    describe("Testing the edit function", () => {
        it("The function should be declared", () => {
            expect(productModel.edit).toBeDefined();
        });
        it("The product id (1) should be updated", async () => {
            const productData: product = {
                id: 1,
                title: 'rice',
                price: 20
            };
            await productModel.edit(productData);
            const { title, price } = await productModel.show(1);
            expect({ title, price }).toEqual({title: 'rice', price: 20});
        });
    });

    describe("Testing the delete function", () => {
        it("The function should be declared", () => {
            expect(productModel.delete).toBeDefined();
        });
        it("The product id (1) should be deleted", async () => {
            await productModel.delete(1);
            const data = await productModel.show(1);
            expect(data).toBeUndefined();
        });
    });

    afterAll(async () => {
        await productModel.deleteAll();
    });
});