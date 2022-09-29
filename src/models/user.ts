import { throws } from "assert";
import Client from "../database";

export type user = {
    id: number,
    first_name: string,
    last_name: string,
    password: string
};

export default class User {
    async index(): Promise<user[]> {
        try {
            const connection = await Client.connect();
            const sql = 'SELECT * FROM user_table';
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        } catch (error) {
            throw new Error(`connection field at the index query with error ${error}`);
        }
    }

    async show(id: number): Promise<user> {
        try {
            const connection = await Client.connect();
            const sql = 'SELECT * FROM user_table WHERE id = ($1)';
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`connection field at the show query with error ${error}`);
        }
    }

    async create(User: user): Promise<user> {
        try {
            const connection = await Client.connect();
            const sql = 'INSERT INTO user_table (first_name, last_name, password) VALUES (($1), ($2), ($3))';
            const result = await connection.query(sql, [User.first_name, User.last_name, User.password]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Cannot create new user: error ${error}`);
        }
    }
}