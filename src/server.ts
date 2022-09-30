import express, {Response, Request, Application} from 'express';
import bodyParser from 'body-parser';
import userRoutes from './handlers/userHandler';
import productRoutes from './handlers/productHandler';
import orderRoutes from './handlers/orderHandler';
import servicesRoutes from './handlers/servicesHandler';

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
    res.status(200).send('<h1> Hello from the store front project</h1>');
});

// server routes
userRoutes(app);
productRoutes(app);
orderRoutes(app);
servicesRoutes(app);

app.listen(PORT, () => {
    console.log(`Successfully connected to the port ${PORT}`);
});

export default app;