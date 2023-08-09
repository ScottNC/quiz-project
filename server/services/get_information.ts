import { queryDatabase } from "../db";
import { QueryParams, isNumberString } from "../helpers/check";
import { Answer, Category, CorrectAnswer, CurrentQuestion, Name, Question, Quiz, Result, Stats, Subcategory } from "../types/quiz_types";

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

export async function getName (quizId: QueryParams) {
  const name: Name[] = await queryDatabase('SELECT name FROM quiz WHERE id = $1', [`${quizId}`])

  return name;
}

export async function getQuestion (quizId: QueryParams, questionNumber: QueryParams) {
  const questionAnswerQuery : string = `SELECT qu.id AS id, qu.text AS "questionText", a.id AS "answerId", a.text AS 
                                answer, qqr.multiple_choice as "multipleChoice" FROM quiz_question_relation AS qqr 
                                JOIN question AS qu ON qqr.question_id = qu.id JOIN answer AS a ON qu.answer_id = a.id 
                                WHERE qqr.quiz_id = ${quizId} AND qqr.question_number = ${questionNumber}`;

  const questionAnswerInfo = await queryDatabase(questionAnswerQuery);

  if (questionAnswerInfo.length === 0) throw new Error('This question does not exist');

  console.log(questionAnswerInfo[0]);

  const { questionText, id, answerId, answer, multipleChoice } = questionAnswerInfo[0];

  const countInfo = await queryDatabase(`select COUNT(*) as "numberOfQuestions" from quiz_question_relation where quiz_id = ${quizId}`);

  const { numberOfQuestions } = countInfo[0];

  const finalQuestion = numberOfQuestions === questionNumber;

  const answers: Answer[] = multipleChoice ? await getAllAnswers(id, answerId, answer) : [{answerId, answer}];

  const questionInfo: Question[] = [ { id , questionText , multipleChoice , finalQuestion , answers } ];
  return questionInfo;
}

async function getAllAnswers(questionId: `${number}`, answerId: `${number}`, answer: string) {

  const otherAnswerQuery : string = `SELECT * FROM (
          SELECT DISTINCT a.id AS "answerId", a.text AS answer 
          FROM answer AS a 
          JOIN subcategory_relation AS sr ON a.id = sr.answer_id 
          WHERE sr.subcategory_id IN (SELECT subcategory_id FROM subcategory_relation WHERE question_id = ${questionId}) 
          AND NOT a.id = ${answerId}
          AND a.type_id = (SELECT type_id FROM question WHERE id = ${questionId})
      ) AS subquery_alias 
      ORDER BY RANDOM() LIMIT 3`;

  const otherAnswerInfo : Answer[] = await queryDatabase(otherAnswerQuery);

  otherAnswerInfo.splice(Math.floor(Math.random() * 4), 0, {answerId, answer})

  return otherAnswerInfo;
}

export async function getCurrentQuestion (roundId: QueryParams) {
  const currentInfo: CurrentQuestion[] = await queryDatabase('SELECT answered, status FROM round WHERE id = $1', [`${roundId}`]);

  if (!currentInfo.length) throw new Error(`Round ${roundId} does not exist`);

  return currentInfo;
}

export async function getCorrectAnswer (questionId: QueryParams) {
  const correctInfo: CorrectAnswer[] = await queryDatabase('SELECT answer_id AS "correctAnswerId" FROM question WHERE id = $1', [`${questionId}`]);

  if (!correctInfo.length) throw new Error(`Question ${questionId} does not exist`);

  return correctInfo;
}

export async function getResult (roundId: QueryParams) {

  const getCountQuery = `SELECT COUNT(*)::int FROM quiz_question_relation AS qqr JOIN round AS r ON r.quiz_id = qqr.quiz_id WHERE r.id = ${roundId}`;
  const results : Result[] = await queryDatabase(`SELECT answered, correct, quiz_id AS "quizId", (${getCountQuery}) AS "questionCount" FROM round WHERE round.id = ${roundId}`);

  return results;
}

export async function getStats() {

  const stats : Stats[] = await queryDatabase(`SELECT (SELECT COUNT(*)::int FROM round WHERE status = 'finished' and created_at::date = now()::date) as "played_today"
    , (SELECT SUM(correct)::int FROM round WHERE status = 'finished' AND created_at::date = now()::date) AS correct_today
    , (SELECT SUM(answered)::int FROM round WHERE status = 'finished' AND created_at::date = now()::date) AS answered_today
    , (SELECT COUNT(*)::int FROM round WHERE status = 'finished') as "played_total"
    , (SELECT SUM(correct)::int FROM round WHERE status = 'finished') AS "correct_total"
    , (SELECT SUM(answered)::int FROM round WHERE status = 'finished') AS "answered_total"
    , q.name AS "quiz", s.name AS "topic" FROM quiz q JOIN round r ON q.id = r.quiz_id
    JOIN subcategory_relation AS sr ON sr.quiz_id = q.id JOIN subcategory AS s ON sr.subcategory_id = s.id
    GROUP BY q.name, s.name ORDER BY COUNT(*) DESC LIMIT 1`);

  return stats;
}

export async function getRandom () {
  const results : Quiz[] = await queryDatabase(`SELECT id, name FROM quiz ORDER BY RANDOM() LIMIT 1`);

  return results;
}