import Client from "../database";

export default class miscQueries {
    async getAllIncomplitedOrders(user_id: number):
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
                            order by (order_id)`;
            const result = await connection.query(sql, [user_id]);
            connection.release();
            return result.rows;
        } catch (error) {
            throw new Error(`connection failed at the getAllIncomplitedOrders with error: ${error}`);
        }
    }

}