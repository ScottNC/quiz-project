import express, { Express, Request, Response } from "express";
import { getCategory, getQuestion, getQuiz, getSubcategory } from "../services/get_information";
import { postStart } from "../services/post_information";
import { putAnswer } from "../services/put_information";

export function addAPIRoutes(app: Express) {
	console.log('🛠️  Creating API router...');

	const apiRouter = express.Router();
	apiRouter.use((req, res, next) => {
		res.setHeader('Content-Type', 'application/json');
		next();
	});

	console.log('📨  Adding GET category route...');
	apiRouter.get('/category', async(req: Request, res: Response) => {
    try {
      const result = await getCategory();
      res.status(200).json(result);
    } catch (error) {
      console.error('Error while getting categories', error);
      res.status(500).json({ error });
    }
  });

  console.log('📨  Adding GET subcategory route...');
	apiRouter.get('/subcategory', async(req: Request, res: Response) => {
    try {
      const categoryId = req.query?.categoryId;
      const result = await getSubcategory(categoryId) ;
      res.status(200).json(result);
    } catch (error) {
      console.error('Error while getting subcategories', error);
      res.status(500).json({ error });
    }
  });

  console.log('📨  Adding GET quiz route...');
	apiRouter.get('/quiz', async(req: Request, res: Response) => {
    try {
      const categoryId = req.query?.categoryId;
      const limit = req.query?.numberOfReturns;
      const result = await getQuiz(categoryId, limit);
      res.status(200).json(result);
    } catch (error) {
      console.error('Error while getting quizzes', error);
      res.status(500).json({ error });
    }
  });

  console.log('📨  Adding GET question route...');
	apiRouter.get('/question', async(req: Request, res: Response) => {
    try {
      const quizId = req.query?.quizId;
      const questionNumber = req.query?.questionNumber;
      const result = await getQuestion(quizId, questionNumber);
      res.status(200).json(result);
    } catch (error) {
      console.error('Error while getting quizzes', error);
      res.status(500).json({ error });
    }
  });

  console.log('📨  Adding POST start route...');
	apiRouter.post('/start', async(req: Request, res: Response) => {
    try {
      const quizId = req.query?.quizId;
      const result = await postStart(quizId);
      res.status(201).json(result);
    } catch (error) {
      console.error('Error while starting quiz', error);
      res.status(500).json({ error });
    }
  });

  console.log('📨  Adding PUT answer route...');
	apiRouter.put('/answer', async(req: Request, res: Response) => {
    try {
      const roundId = req.query?.roundId;
      const questionNumber = req.query?.questionNumber;
      const correct = req.query?.correct;
      const result = await putAnswer(roundId, questionNumber, correct);
      res.status(201).json(result);
    } catch (error) {
      console.error('Error while submitting answer', error);
      res.status(500).json({ error });
    }
  });

	console.log('🛠️  Applying API router to Express server...');
	app.use('/api', apiRouter);
}
