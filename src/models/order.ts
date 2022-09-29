import Client from "../database";

export type order = {
    id: number,
    user_id: number
};

export default class Order {
    async index(): Promise<order[]> {
        try {
            const connection = await Client.connect();
            const sql = 'SELECT * FROM order_table';
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
            const sql = 'SELECT * FROM order_table WHERE id = ($1)';
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
            const sql = 'INSERT INTO order_table (user_id) VALUES (($1))';
            const result = await connection.query(sql, [Order.user_id]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Cannot create new order: error ${error}`);
        }
    }

    async addProductToOrder(orderId: number, productId: number, quantity: number): Promise<{order_id: number, product_id: number, quantity: number}> {
        try {
            const connection = await Client.connect();
            const sql = 'INSERT INTO order_product_table (order_id, product_id, quantity) VALUES (($1), ($2), ($3))';
            const result = await connection.query(sql, [orderId, productId, quantity]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Cannot insert new product into order: error ${error}`);
        }
    }
}