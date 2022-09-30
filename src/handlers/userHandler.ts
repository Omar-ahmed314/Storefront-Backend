import User, {user} from "../models/user";
import { tokenVerfication, userEncryption, userValidation } from './middleware/userHandlerMid';
import { Response, Request, Application } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

const userModel = new User();

// endpoints
const index = async (req : Request, res: Response) => {
   try {
       const data = await userModel.index();
       res.status(200);
       res.json(data);
   } catch (error) {
    res.status(500);
    res.send(error);
   }
}

const show = async (req : Request, res: Response) => {
    try {
        const data = await userModel.show(req.params.id as unknown as number);
        res.status(200);
        res.json(data);
    } catch (error) {
     res.status(500);
     res.send(error);
    }
 }

const create = async (req: Request, res: Response) => {
    try {
        const userData: user = {
            id: 1,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: req.body.password
        };
        const data = await userModel.create(userData);
        const token = jwt.sign({
            user_id: data.id,
            first_name: data.first_name,
            last_name: data.last_name
        }, process.env.JSON_SECRET_KEY as unknown as string);
        res.status(200);
        res.json(token);
    } catch (error) {
        res.status(400);
        res.send(error);
    }
}

const edit = async (req: Request, res: Response) => {
    try {
        const userData: user = {
            id: req.body.id,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: req.body.password
        };
        const data = await userModel.edit(userData);
        res.status(200);
        res.json(data);
    } catch (error) {
        res.status(400);
        res.send(error);
    }
}

const _delete = async (req: Request, res: Response) => {
    try {
        const data = await userModel.delete(req.params.id as unknown as number);
        res.status(200);
        res.json(data);
    } catch (error) {
        res.status(400);
        res.send(error);
    }
}

const userRoutes = (app: Application) => {
    app.get('/user', [tokenVerfication], index);
    app.get('/user/:id', [tokenVerfication], show);
    app.post('/user', [userValidation, userEncryption], create);
    app.put('/user', [tokenVerfication], edit);
    app.delete('/user/:id', [tokenVerfication], _delete);
}

export default userRoutes;