import express, { Express } from 'express';
import cors from 'cors';
import cron from 'node-cron';
import { setupRoutes } from './routes/routes';
import { populateQuestions, populateQuiz } from './utils/database_populator';

const app: Express = express();
const port: number = 3000;

app.use(cors());

setupRoutes(app);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


// run these functions on the first day of each month
cron.schedule('0 0 1 * *', async () => {
  await populateQuestions();
  await populateQuiz();
});
