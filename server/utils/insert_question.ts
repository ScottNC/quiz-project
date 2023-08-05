import { queryDatabase } from "../db";

export async function insertQuestion(questionText: string, artist: string, typeId: string, categoryId: string | number) {
  const answerString = `INSERT INTO answer (text, category_id, type_id) VALUES ($1, $2, $3) ON CONFLICT (text) DO NOTHING`;
  await queryDatabase(answerString, [artist, categoryId, typeId]);

  const answer = await queryDatabase(`SELECT id FROM answer WHERE text = $1 and category_id = $2`, [artist, categoryId]);

  const questionString = `INSERT INTO question (text, category_id, type_id, answer_id) VALUES ($1, $2, $3, $4) RETURNING id`;
  const question = await queryDatabase(questionString, [questionText, categoryId, typeId, answer[0]?.id]);

  return { answerId: answer[0]?.id, questionId: question[0]?.id };
}
