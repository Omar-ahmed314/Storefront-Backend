import User, {user} from "../models/user";
import { Response, Request, Application } from 'express';

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
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: req.body.password
        };
        const data = await userModel.create(userData);
        res.status(200);
        res.json(data);
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
    app.get('user', index);
    app.get('user/:id', show);
    app.post('user', create);
    app.put('user', edit);
    app.delete('user/:id', _delete);
}

export default userRoutes;