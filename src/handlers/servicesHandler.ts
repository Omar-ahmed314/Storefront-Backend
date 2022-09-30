import miscQueries from '../services/services';
import { Response, Request, Application } from 'express';

const miscQueriesModel = new miscQueries();

// endpoints
const incomplitedOrders = async (req : Request, res: Response) => {
   try {
       const data = await miscQueriesModel.getAllIncomplitedOrders(req.body.id);
       res.status(200);
       res.json(data);
   } catch (error) {
    res.status(404);
    res.send(error);
   }
}

const servicesRoutes = (app: Application) => {
    app.get('/all_incomplited_orders', incomplitedOrders);
}

export default servicesRoutes;