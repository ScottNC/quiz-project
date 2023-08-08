import express, { Express } from 'express';
import cors from 'cors';
import { setupRoutes } from './routes/routes';

const app: Express = express();
const port: number = 3000;

app.use(cors());

setupRoutes(app);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
