import { queryDatabase } from "../db";

interface ExternalSource {
  name: string,
  domain: string,
  apikey: string
  category_id: number
}

export async function populateQuestions() {

  await queryDatabase('DELETE FROM subcategory_relation');
  await queryDatabase('DELETE FROM quiz_question_relation');
  await queryDatabase('DELETE FROM question');
  await queryDatabase('DELETE FROM answer');
  await queryDatabase('DELETE FROM round');
  await queryDatabase('DELETE FROM quiz');

  const externalSources: ExternalSource[] = await queryDatabase('SELECT name, domain, apikey, category_id FROM external_source');

  externalSources.forEach(async ( { name , domain, apikey, category_id } : ExternalSource) => {
    const { populate } = require('./external_sources/' + name);
    await populate(domain, apikey, category_id);
  });
}

export async function populateQuiz() {
  
  const categories = await queryDatabase('SELECT id, name FROM category');

  categories.forEach(addQuizzes);
}

async function addQuizzes(category: any) {
  const subcategories = await queryDatabase('SELECT id, name FROM subcategory WHERE category_id = $1', [category.id.toString()]);

  subcategories.forEach(async (subcategory: any) => {
    const questions = await queryDatabase('SELECT question_id FROM subcategory_relation WHERE subcategory_id = $1 AND question_id IS NOT NULL ORDER BY RANDOM() LIMIT 10', [subcategory.id.toString()]);

    if (questions.length === 5) {
      const quizName = [subcategory.name, category.name, 'Quiz'].join(' ');
      
      const quizInfo = await queryDatabase('INSERT INTO quiz (name, category_id) VALUES ($1, $2) RETURNING id', [quizName, category.id.toString()]);

      const quizId = quizInfo[0]?.id;

      await queryDatabase('INSERT INTO subcategory_relation (quiz_id, subcategory_id) VALUES ($1, $2)', [quizId, subcategory.id])

      questions.forEach((question, idx) => linkQuestion(question, idx + 1, quizId.toString()))
    }
  })
}

async function linkQuestion (question: any, questionNumber: number, quizId: string) {
  await queryDatabase('INSERT INTO quiz_question_relation (quiz_id, question_id, question_number, multiple_choice) VALUES ($1, $2, $3, $4)', [quizId, question.question_id, questionNumber, true]);
}