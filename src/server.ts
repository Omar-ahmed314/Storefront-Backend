import express, {Response, Request, Application} from 'express';
import bodyParser from 'body-parser';

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
    res.status(200).send('<h1> Hello from the store front project</h1>');
});

app.listen(PORT, () => {
    console.log(`Successfully connected to the port ${PORT}`);
});