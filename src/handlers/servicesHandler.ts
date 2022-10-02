import miscQueries from '../services/services';
import { Response, Request, Application } from 'express';
import { tokenVerfication } from './middleware/userHandlerMid';

const miscQueriesModel = new miscQueries();

// endpoints
const incompletedOrders = async (req : Request, res: Response) => {
   try {
       const data = await miscQueriesModel.getAllIncompletedOrders(req.body.id);
       res.status(200);
       res.json(data);
   } catch (error) {
    res.status(404);
    res.send(error);
   }
}

const servicesRoutes = (app: Application) => {
    app.get('/all_incompleted_orders', [tokenVerfication], incompletedOrders);
}

export default servicesRoutes;