import Order, { order } from "../../models/order";
import User, { user } from "../../models/user";

const orderModel = new Order();

describe("Testing the order model", () => {
    let userTest: user;
    let orderTest: order;
    beforeAll(async () => {
        const userModel = new User();
        const userData: user = {
            id: 1,
            first_name: 'omar',
            last_name: 'ahmed',
            password: 'password123'
        };
        await userModel.deleteAll();
        userTest = await userModel.create(userData);
    });

    describe("Testing the index function", () => {
        it("The function should be declared", () => {
            expect(orderModel.index).toBeDefined();
        });
        it("The table should be empty", async () => {
            const data = await orderModel.index();
            expect(data).toEqual([]);
        });
    });

    describe("Testing the create function", () => {
        it("The function should be declared", () => {
            expect(orderModel.create).toBeDefined();
        });
        it("The order should be created", async () => {
            const orderData: order = {
                id: 1, // redundant
                user_id: userTest.id,
                status: false,
            };
            orderTest = await orderModel.create(orderData);
            expect(orderTest).toBeDefined();
        });
    });

    describe("Testing the show function", () => {
        it("The function should be declared", () => {
            expect(orderModel.show).toBeDefined();
        });
        it("The order should be exist", async () => {
            const data = await orderModel.show(orderTest.id);
            expect(data).toBeDefined();
        });
    });

    describe("Testing the edit function", () => {
        it("The function should be declared", () => {
            expect(orderModel.edit).toBeDefined();
        });
        it("The order should be updated", async () => {
            // update the status of the previous created order
            const orderData: order = orderTest;
            orderData.status = true;

            const data = await orderModel.edit(orderData);
            expect(data).toBeDefined();
        });
    });

    describe("Testing the delete function", () => {
        it("The function should be declared", () => {
            expect(orderModel.delete).toBeDefined();
        });
        it("The order should be deleted", async () => {
            await orderModel.delete(orderTest.id);
            const data = await orderModel.show(orderTest.id);
            expect(data).toBeUndefined();
        });
    });

    afterAll(async () => {
        await orderModel.deleteAll();
    });
});