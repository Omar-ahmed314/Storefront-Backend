import Client from "../database";
import { user } from "../models/user";

export default class miscQueries {
    async getAllIncompletedOrders(user_id: number):
     Promise<{
        product_id: number,
        title: string,
        price: number,
        quantity: number,
        status: boolean}[]> {
        try {
            const connection = await Client.connect();
            const sql = `select order_id, 
                            product_id, 
                            title,
                            price,
                            quantity,
                            status
                            from order_product_table as opt, 
                            product_table as pt, 
                            order_table as ot 
                            where ot.user_id = ($1)
                            and opt.order_id = ot.id
                            and opt.product_id = pt.id
                            and ot.status = false
                            order by (order_id)`;
            const result = await connection.query(sql, [user_id]);
            connection.release();
            return result.rows;
        } catch (error) {
            throw new Error(`connection failed at the getAllIncompletedOrders with error: ${error}`);
        }
    }

    async getUserByName(first_name: string, last_name: string): Promise<user> {
        try {
            const connection = await Client.connect();
            const sql = 'SELECT * FROM user_table WHERE first_name = ($1) AND last_name = ($2)';
            const result = await connection.query(sql, [first_name, last_name]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`connection failed at the getUserByName with error: ${error}`);
        }
    }

}