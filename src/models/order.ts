import Client from "../database";

export type order = {
    id: number,
    user_id: number,
    status: boolean
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

    async show(id: number): Promise<order> {
        try {
            const connection = await Client.connect();
            const sql = 'SELECT * FROM order_table WHERE id = ($1)';
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`connection field at the show query with error ${error}`);
        }
    }

    async create(Order: order): Promise<order> {
        try {
            const connection = await Client.connect();
            const sql = 'INSERT INTO order_table (user_id, status) VALUES (($1), ($2)) RETURNING *';
            const result = await connection.query(sql, [Order.user_id, Order.status]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Cannot create new order: error ${error}`);
        }
    }

    async edit(Order: order): Promise<order> {
        try {
            const connection = await Client.connect();
            const sql = 'UPDATE order_table SET status = ($1) WHERE id = ($2) RETURNING *';
            const result = await connection.query(sql, [Order.status, Order.id]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Cannot create new order: error ${error}`);
        }
    }

    async delete(id: number): Promise<order> {
        try {
            const connection = await Client.connect();
            const sql = 'DELETE FROM order_table WHERE id = ($1)';
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Cannot create new order: error ${error}`);
        }
    }

    async addProductToOrder(orderId: number, productId: number, quantity: number): Promise<{order_id: number, product_id: number, quantity: number}> {
        try {
            const connection = await Client.connect();
            const sql = 'INSERT INTO order_product_table (order_id, product_id, quantity) VALUES (($1), ($2), ($3)) RETURNING *';
            const result = await connection.query(sql, [orderId, productId, quantity]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Cannot insert new product into order: error ${error}`);
        }
    }

    async deleteAll(): Promise<order> {
        try {
            const connection = await Client.connect();
            const sql = 'DELETE FROM order_table;';
            const result = await connection.query(sql);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Cannot delete all the orders: error ${error}`);
        }
    }
}