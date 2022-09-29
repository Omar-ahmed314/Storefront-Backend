import User, { user } from "../../models/user";

const userModel = new User();

describe("Testing the user model", () => {
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
                first_name: 'omar',
                last_name: 'ahmed',
                password: 'password123'
            };
            const {first_name, last_name, password} = await userModel.create(userData);
            expect({first_name, last_name, password}).toEqual({first_name: 'omar', last_name: 'ahmed', password: 'password123'});
        });
    });

    describe("Testing the show function", () => {
        it("The function should be declared", () => {
            expect(userModel.show).toBeDefined();
        });
        it("The user id (1) should be existed", async () => {
            const userData: user = {
                first_name: 'omar',
                last_name: 'ahmed',
                password: 'password123'
            };
            // await userModel.create(userData);
            const data = await userModel.show(1);
            expect(data).toBeDefined();
        });
    });

    describe("Testing the edit function", () => {
        it("The function should be declared", () => {
            expect(userModel.edit).toBeDefined();
        });
        it("The user id (1) should be updated", async () => {
            const userData: user = {
                id: 1,
                first_name: 'samer',
                last_name: 'ahmed',
                password: 'hspc'
            };
            // await userModel.create(userData);
            await userModel.edit(userData);
            const { first_name, last_name, password } = await userModel.show(1);
            expect({ first_name, last_name, password }).toEqual({first_name: 'samer', last_name: 'ahmed', password: 'hspc'});
        });
    });

    describe("Testing the delete function", () => {
        it("The function should be declared", () => {
            expect(userModel.delete).toBeDefined();
        });
        it("The user id (1) should be deleted", async () => {
            await userModel.delete(1);
            const data = await userModel.show(1);
            expect(data).toBeUndefined();
        });
    });

    afterAll(async () => {
        await userModel.deleteAll();
    });
});