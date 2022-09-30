import Order, {order} from "../models/order";
import { Response, Request, Application } from 'express';

const orderModel = new Order();

// endpoints
const index = async (req : Request, res: Response) => {
   try {
       const data = await orderModel.index();
       res.status(200);
       res.json(data);
   } catch (error) {
    res.status(500);
    res.send(error);
   }
}

const show = async (req : Request, res: Response) => {
    try {
        const data = await orderModel.show(req.params.id as unknown as number);
        res.status(200);
        res.json(data);
    } catch (error) {
     res.status(500);
     res.send(error);
    }
 }

const create = async (req: Request, res: Response) => {
    try {
        const orderData: order = {
            id: 1,
            user_id: req.body.user_id,
            status: req.body.status
        };
        const data = await orderModel.create(orderData);
        res.status(200);
        res.json(data);
    } catch (error) {
        res.status(400);
        res.send(error);
    }
}

const edit = async (req: Request, res: Response) => {
    try {
        const orderData: order = {
            id: req.body.id,
            user_id: req.body.user_id,
            status: req.body.status
        };
        const data = await orderModel.edit(orderData);
        res.status(200);
        res.json(data);
    } catch (error) {
        res.status(400);
        res.send(error);
    }
}

const addProductToOrder = async (req: Request, res: Response) => {
    try {
        const { order_id, product_id, quantity } = req.body;
        const data = await orderModel.addProductToOrder(order_id, product_id, quantity);
        res.status(200);
        res.json(data);
    } catch (error) {
        res.status(400);
        res.send(error);
    }
}

const _delete = async (req: Request, res: Response) => {
    try {
        const data = await orderModel.delete(req.params.id as unknown as number);
        res.status(200);
        res.json(data);
    } catch (error) {
        res.status(400);
        res.send(error);
    }
}

const orderRoutes = (app: Application) => {
    app.get('/order', index);
    app.get('/order/:id', show);
    app.post('/order', create);
    app.put('/order', edit);
    app.post('/order/product', addProductToOrder);
    app.delete('/order/:id', _delete);
}

export default orderRoutes;