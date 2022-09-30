import app from "../../server";
import supertest from "supertest";
import { order } from "../../models/order";
import { user } from "../../models/user";
const superTest = supertest(app);


describe("Testing order routes", () => {
    let orderTest: order;
    let userTest: user;
    let token: string;
    beforeAll(async () => {
        const data = await superTest.post('/user').send({
            first_name: 'omar',
            last_name: 'ahmed',
            password: 'password123'
        });
        userTest = data.body;
        token = data.headers.authorization;
    });

    describe("Testing index endpoint", () => {
        it("should return empty array", async () => {
            const data = await superTest.get('/order')
            .set('authorization', token);
            expect(data.body).toEqual([]);
        });
    });

    describe("Testing create endpoint", () => {
        it("should return the created order", async () => {
            const data = await superTest.post('/order')
            .set('authorization', token)
            .send({
                user_id: userTest.id,
                status: false
            });
            orderTest = data.body;
            expect(data.status).toEqual(200);
        });
    });

    describe("Testing show endpoint", () => {
        it("should return the needed order", async () => {
            const data = await superTest.get(`/order/${orderTest.id}`)
            .set('authorization', token);
            expect(data.status).toEqual(200);
        });
    });

    describe("Testing edit endpoint", () => {
        it("should edit the needed order", async () => {
            const data = await superTest.put(`/order`)
            .set('authorization', token)
            .send({
                id: orderTest.id,
                user_id: userTest.id,
                status: true
            });
            orderTest = data.body;
            expect(data.status).toEqual(200);
        });
    });

    describe("Testing delete endpoint", () => {
        it("should delete the needed order", async () => {
            const data = await superTest.delete(`/order/${orderTest.id}`)
            .set('authorization', token);
            expect(data.status).toEqual(200);
        });
    });

    afterAll(async () => {
        await superTest.delete(`/user/${userTest.id}`)
        .set('authorization', token);
    })
});