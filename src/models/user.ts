import Client from "../database";

export type user = {
    id?: number,
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
            const sql = 'INSERT INTO user_table (first_name, last_name, password) VALUES (($1), ($2), ($3)) RETURNING *';
            const result = await connection.query(sql, [User.first_name, User.last_name, User.password]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Cannot create new user: error ${error}`);
        }
    }

    async edit(User: user): Promise<user> {
        try {
            const connection = await Client.connect();
            const sql = 'UPDATE user_table SET first_name = ($1), last_name = ($2),  password = ($3) WHERE id = ($4) RETURNING *';
            const result = await connection.query(sql, [User.first_name, User.last_name, User.password, User.id]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Cannot edit the user: error ${error}`);
        }
    }

    async delete(id: number): Promise<user> {
        try {
            const connection = await Client.connect();
            const sql = 'DELETE FROM user_table WHERE id = ($1)';
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Cannot delete the user: error ${error}`);
        }
    }

    async deleteAll(): Promise<user> {
        try {
            const connection = await Client.connect();
            const sql = 'DELETE FROM user_table;';
            const result = await connection.query(sql);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Cannot delete all the users: error ${error}`);
        }
    }
}