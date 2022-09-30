import User, { user } from "../../models/user";

const userModel = new User();

describe("Testing the user model", () => {
    let userTest: user;
    beforeAll(async () => {
        await userModel.deleteAll();
    });
    
    describe("Testing the index function", () => {
        it("The function should be declared", () => {
            expect(userModel.index).toBeDefined();
        });
        it("The table should be empty", async () => {
            const data = await userModel.index();
            expect(data).toEqual([]);
        });
    });

    describe("Testing the create function", () => {
        it("The function should be declared", () => {
            expect(userModel.create).toBeDefined();
        });
        it("The user should be created", async () => {
            const userData: user = {
                id: 1,
                first_name: 'omar',
                last_name: 'ahmed',
                password: 'password123'
            };
            userTest  = await userModel.create(userData);
            expect(userTest).toBeDefined();
        });
    });

    describe("Testing the show function", () => {
        it("The function should be declared", () => {
            expect(userModel.show).toBeDefined();
        });
        it("The user id should be existed", async () => {
            const data = await userModel.show(userTest.id);
            expect(data).toBeDefined();
        });
    });

    describe("Testing the edit function", () => {
        it("The function should be declared", () => {
            expect(userModel.edit).toBeDefined();
        });
        it("The user should be updated", async () => {
            const userData: user = userTest;
            userData.first_name = 'samer';
            const data = await userModel.edit(userData);
            expect(data).toBeDefined();
        });
    });

    describe("Testing the delete function", () => {
        it("The function should be declared", () => {
            expect(userModel.delete).toBeDefined();
        });
        it("The user should be deleted", async () => {
            await userModel.delete(userTest.id);
            const data = await userModel.show(userTest.id);
            expect(data).toBeUndefined();
        });
    });

    afterAll(async () => {
        await userModel.deleteAll();
    });
});