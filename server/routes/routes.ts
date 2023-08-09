import express, { Express, Request, Response } from "express";
import { getCategory, getCorrectAnswer, getCurrentQuestion, getQuestion, getQuiz, getResult, getStats, getSubcategory } from "../services/get_information";
import { postStart } from "../services/post_information";
import { putAnswer } from "../services/put_information";
import { isBooleanString, isNumberString } from "../helpers/check";

export function setupRoutes(app: Express) {
	console.log('🛠️  Creating API router...');

  addHealthCheck(app);
  addAPIRoutes(app);
}

function addAPIRoutes(app: Express) {
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

      if (!isNumberString(quizId)) res.status(400).json({ error : 'Must contain quizId and it must be a number' });
      else if (!isNumberString(questionNumber)) res.status(400).json({ error : 'Must contain questionNumber and it must be a number' });
      else {
        const result = await getQuestion(quizId, questionNumber);
        res.status(200).json(result);
      }
    } catch (error) {
      console.error('Error while getting quizzes', error);
      res.status(500).json({ error });
    }
  });

  console.log('📨  Adding GET currentquestion route...');
	apiRouter.get('/currentquestion', async(req: Request, res: Response) => {
    try {
      const roundId = req.query?.roundId;

      if (!isNumberString(roundId)) res.status(400).json({ error : 'Must contain roundId and it must be a number' });
      else {
        const result = await getCurrentQuestion(roundId);
        res.status(200).json(result);
      }
    } catch (error) {
      console.error('Error while getting quizzes', error);
      res.status(500).json({ error });
    }
  });

  console.log('📨  Adding GET correctanswer route...');
	apiRouter.get('/correctanswer', async(req: Request, res: Response) => {
    try {
      const questionId = req.query?.questionId;

      if (!isNumberString(questionId)) res.status(400).json({ error : 'Must contain questionId and it must be a number' });
      else {
        const result = await getCorrectAnswer(questionId);
        res.status(200).json(result);
      }
    } catch (error) {
      console.error('Error while getting quizzes', error);
      res.status(500).json({ error });
    }
  });

  console.log('📨  Adding GET result route...');
	apiRouter.get('/result', async(req: Request, res: Response) => {
    try {
      const roundId = req.query?.roundId;

      if (!isNumberString(roundId)) res.status(400).json({ error : 'Must contain roundId and it must be a number' });
      else {
        const result = await getResult(roundId);
        res.status(200).json(result);
      }
    } catch (error) {
      console.error('Error while getting results', error);
      res.status(500).json({ error });
    }
  });

  console.log('📨  Adding GET stats route...');
	apiRouter.get('/stats', async(req: Request, res: Response) => {
    try {
      const result = await getStats();
      res.status(200).json(result);
    } catch (error) {
      console.error('Error while getting stats', error);
      res.status(500).json({ error });
    }
  });

  console.log('📨  Adding POST start route...');
	apiRouter.post('/start', async(req: Request, res: Response) => {
    try {
      const quizId = req.query?.quizId;
      if (!isNumberString(quizId)) res.status(400).json({ error : 'Must contain quidId and it must be a number' });
      else {
        const result = await postStart(quizId);
        res.status(201).json(result);
      }
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

      if (!isNumberString(roundId)) res.status(400).json({ error : 'Must contain roundId and it must be a number' });
      else if (!isNumberString(questionNumber)) res.status(400).json({ error : 'Must contain questionNumber and it must be a number' });
      else if (!isBooleanString(correct)) res.status(400).json({ error : 'Must contain correct and it must be a boolean' });
      else {
        const result = await putAnswer(roundId, questionNumber, correct);
        res.status(201).json(result);
      }
    } catch (error) {
      console.error('Error while submitting answer', error);
      res.status(500).json({ error });
    }
  });

	console.log('🛠️  Applying API router to Express server...');
	app.use('/api', apiRouter);
}

function addHealthCheck(app: Express) {
	console.log('🛠️  Creating base router...');

	const baseRouter = express.Router();

	baseRouter.use((req, res, next) => {
		res.header('Access-Control-Allow-Methods', 'GET');
		console.log(`📨 ${req.url}`);
		next();
	});

	console.log('🏠❤️‍🩹  Adding health check route...');
	baseRouter.get('/health', (req, res) => {
		res.status(200).send('👍 Okay! The server is responding! 🙌');
	});

	console.log('🛠️  Applying base router to Express server...');
	app.use('/', baseRouter);
}
