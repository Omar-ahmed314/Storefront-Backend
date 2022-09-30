import Product, {product} from "../models/product";
import { Response, Request, Application } from 'express';
import { tokenVerfication } from "./middleware/userHandlerMid";

const productModel = new Product();

// endpoints
const index = async (req : Request, res: Response) => {
   try {
       const data = await productModel.index();
       res.status(200);
       res.json(data);
   } catch (error) {
    res.status(500);
    res.send(error);
   }
}

const show = async (req : Request, res: Response) => {
    try {
        const data = await productModel.show(req.params.id as unknown as number);
        res.status(200);
        res.json(data);
    } catch (error) {
     res.status(500);
     res.send(error);
    }
 }

const create = async (req: Request, res: Response) => {
    try {
        const productData: product = {
            id: 1,
            title: req.body.title,
            price: req.body.price
        };
        const data = await productModel.create(productData);
        res.status(200);
        res.json(data);
    } catch (error) {
        res.status(400);
        res.send(error);
    }
}

const edit = async (req: Request, res: Response) => {
    try {
        const productData: product = {
            id: req.body.id,
            title: req.body.title,
            price: req.body.price
        };
        const data = await productModel.edit(productData);
        res.status(200);
        res.json(data);
    } catch (error) {
        res.status(400);
        res.send(error);
    }
}

const _delete = async (req: Request, res: Response) => {
    try {
        const data = await productModel.delete(req.params.id as unknown as number);
        res.status(200);
        res.json(data);
    } catch (error) {
        res.status(400);
        res.send(error);
    }
}

const productRoutes = (app: Application) => {
    app.get('/product', index);
    app.get('/product/:id', show);
    app.post('/product', [tokenVerfication], create);
    app.put('/product', [tokenVerfication], edit);
    app.delete('/product/:id', [tokenVerfication], _delete);
}

export default productRoutes;