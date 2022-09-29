import Client from "../database";

export type product = {
    id: number,
    title: string,
    price: number,
    category: number
};

export default class Product {
    async index(): Promise<product[]> {
        try {
            const connection = await Client.connect();
            const sql = 'SELECT * FROM product_table';
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        } catch (error) {
            throw new Error(`connection field at the index query with error ${error}`);
        }
    }

    async show(id: number): Promise<product> {
        try {
            const connection = await Client.connect();
            const sql = 'SELECT * FROM product_table WHERE id = ($1)';
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`connection field at the show query with error ${error}`);
        }
    }

    async create(Product: product): Promise<product> {
        try {
            const connection = await Client.connect();
            const sql = 'INSERT INTO product_table (title, price) VALUES (($1), ($2))';
            const result = await connection.query(sql, [Product.title, Product.price]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Cannot create new product: error ${error}`);
        }
    }
}