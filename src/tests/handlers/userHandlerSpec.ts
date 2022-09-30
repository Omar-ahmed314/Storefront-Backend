import app from "../../server";
import supertest from "supertest";
import { user } from "../../models/user";
const superTest = supertest(app);


describe("Testing user routes", () => {
    let userTest: user;
    let token: string;
    describe("Testing create endpoint", () => {
        it("should return the created user", async () => {
            const data = await superTest.post('/user').send({
                first_name: 'omar',
                last_name: 'ahmed',
                password: 'password123'
            });
            userTest = data.body;
            token = data.headers.authorization;
            expect(data.status).toEqual(200);
        });
    });

    describe("Testing index endpoint", () => {
        it("should return empty array", async () => {
            const data = await superTest.get('/user')
            .set('authorization', token);
            expect(data.body).not.toEqual([]);
        });
    });


    describe("Testing show endpoint", () => {
        it("should return the needed user", async () => {
            const data = await superTest.get(`/user/${userTest.id}`)
            .set('authorization', token);
            expect(data.status).toEqual(200);
        });
    });

    describe("Testing edit endpoint", () => {
        it("should edit the needed user", async () => {
            const data = await superTest.put(`/user`)
            .set('authorization', token)
            .send({
                id: userTest.id,
                first_name: 'omar',
                last_name: 'ahmed',
                password: 'password234'
            });
            userTest = data.body;
            expect(data.status).toEqual(200);
        });
    });

    describe("Testing delete endpoint", () => {
        it("should delete the needed user", async () => {
            const data = await superTest.delete(`/user/${userTest.id}`)
            .set('authorization', token);
            expect(data.status).toEqual(200);
        });
    });
});