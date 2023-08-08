import { queryDatabase } from "../db";
import { QueryParams, isNumberString } from "../helpers/check";
import { Answer, Category, Question, Quiz, Result, Subcategory } from "../types/quiz_types";

export async function getCategory () {
  const categories : Category[] = await queryDatabase('SELECT id, name FROM category');
  return categories;
}

export async function getSubcategory (categoryId: QueryParams) {

  const condition : string = isNumberString(categoryId) ? ' WHERE category_id = ' + categoryId : '';

  const subcategories : Subcategory[] = await queryDatabase('SELECT id, name FROM subcategory' + condition);
  return subcategories;
}

export async function getQuiz (categoryId: QueryParams, limit: QueryParams) {
  const condition: string = isNumberString(categoryId) ? ' WHERE category_id = ' + categoryId : '';

  const limitQuery: string =  ' LIMIT ' + (isNumberString(limit) ? limit : '1');

  const quizzes : Quiz[] = await queryDatabase('SELECT id, name FROM quiz' + condition + ' ORDER BY RANDOM()' + limitQuery);

  return quizzes;
}

export async function getQuestion (quizId: QueryParams, questionNumber: QueryParams) {
  const questionAnswerQuery : string = `SELECT qu.id AS id, qu.text AS "questionText", a.id AS "answerId", a.text AS 
                                answer, qqr.multiple_choice as "multipleChoice" FROM quiz_question_relation AS qqr 
                                JOIN question AS qu ON qqr.question_id = qu.id JOIN answer AS a ON qu.answer_id = a.id 
                                WHERE qqr.quiz_id = ${quizId} AND qqr.question_number = ${questionNumber}`;

  const questionAnswerInfo = await queryDatabase(questionAnswerQuery);

  if (questionAnswerInfo.length === 0) throw new Error('This question does not exist');

  const { questionText, id, answerId, answer, multipleChoice } = questionAnswerInfo[0];

  const answers: Answer[] = multipleChoice ? await getAllAnswers(id, answerId, answer) : [{answerId, answer}];

  const questionInfo: Question[] = [ { id , questionText , multipleChoice , answers } ];
  return questionInfo;
}

async function getAllAnswers(questionId: `${number}`, answerId: `${number}`, answer: string) {

  const otherAnswerQuery : string = `SELECT a.id AS "answerId", a.text AS answer FROM answer AS a 
                                      JOIN subcategory_relation AS sr ON a.id = sr.answer_id AND sr.subcategory_id IN 
                                      (SELECT subcategory_id FROM subcategory_relation WHERE question_id = ${questionId}) 
                                      WHERE NOT a.id = ${answerId} AND a.type_id  = (SELECT type_id FROM question 
                                      WHERE id = ${questionId}) ORDER BY RANDOM() LIMIT 3;`;

  const otherAnswerInfo : Answer[] = await queryDatabase(otherAnswerQuery);

  otherAnswerInfo.splice(Math.floor(Math.random() * 4), 0, {answerId, answer})

  return otherAnswerInfo;
}

export async function getCurrentQuestion (roundId: QueryParams) {
  const currentInfo = await queryDatabase('SELECT answered, status FROM round WHERE id = $1', [`${roundId}`]);

  if (!currentInfo.length) throw new Error(`Round ${roundId} does not exist`);

  return currentInfo;
}

export async function getCorrectAnswer (questionId: QueryParams) {
  const correctInfo = await queryDatabase('SELECT answer_id AS "correctAnswerId" FROM question WHERE id = $1', [`${questionId}`]);

  if (!correctInfo.length) throw new Error(`Question ${questionId} does not exist`);

  return correctInfo;
}

export async function getResult (roundId: QueryParams) {

  const getCountQuery = `SELECT COUNT(*)::int FROM quiz_question_relation AS qqr JOIN round AS r ON r.quiz_id = qqr.quiz_id WHERE r.id = ${roundId}`;
  const results : Result[] = await queryDatabase(`SELECT answered, correct, (${getCountQuery}) AS "questionCount" FROM round WHERE round.id = ${roundId}`);

  return results;
}