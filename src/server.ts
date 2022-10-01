import express, {Response, Request, Application, NextFunction} from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './handlers/userHandler';
import productRoutes from './handlers/productHandler';
import orderRoutes from './handlers/orderHandler';
import servicesRoutes from './handlers/servicesHandler';

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
    res.status(200).send('<h1> Hello from the store front project</h1>');
});

// server routes
userRoutes(app);
productRoutes(app);
orderRoutes(app);
servicesRoutes(app);

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404);
    res.json({
        msg: "Page not found"
    });
});

app.listen(PORT, () => {
    console.log(`Successfully connected to the port ${PORT}`);
});

export default app;