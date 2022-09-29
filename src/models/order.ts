import Client from "../database";

export type order = {
    id: number,
    product_id: number,
    quantity: number,
    user_id: number
};

export default class Order {
    async index(): Promise<order[]> {
        try {
            const connection = await Client.connect();
            const sql = 'SELECT * FROM orders_table';
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        } catch (error) {
            throw new Error(`connection field at the index query with error ${error}`);
        }
    }

    async show(id: number): Promise<order[]> {
        try {
            const connection = await Client.connect();
            const sql = 'SELECT * FROM orders_table WHERE id = ($1)';
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows;
        } catch (error) {
            throw new Error(`connection field at the show query with error ${error}`);
        }
    }

    async create(Order: order): Promise<order> {
        try {
            const connection = await Client.connect();
            const sql = 'INSERT INTO orders_table (product_id, quantity, user_id) VALUES (($1), ($2), ($3))';
            const result = await connection.query(sql, [Order.product_id, Order.quantity, Order.user_id]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Cannot create new order: error ${error}`);
        }
    }
}