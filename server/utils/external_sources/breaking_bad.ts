import { queryDatabase } from "../../db";
import axios from 'axios';
import { insertQuestion } from "../insert_question";
import { BreakingBadQuote } from "./breaking_bad_types";

export async function populate(domain: string, _apikey: null, categoryId: number) {
  const subcategoryInfo = await queryDatabase('SELECT id FROM subcategory WHERE name = $1 and category_id = $2', ['Breaking Bad', categoryId]);

  const subcategoryId = subcategoryInfo[0]?.id;

  const typeInfo = await queryDatabase('SELECT id from type WHERE name = \'Artist\'');

  const typeId = typeInfo[0].id;

  if (subcategoryId) {
    axios.get(`${domain}/quotes/20`,)
        .then((response) => response.data)
        .then((quotes : BreakingBadQuote[] )=> {
          quotes.forEach(async (quote : BreakingBadQuote) => {
            const { answerId, questionId } = await insertQuestion(`Which Breaking Bad character said: ${quote.quote}`, quote.author, typeId, categoryId);

            await queryDatabase('INSERT INTO subcategory_relation (answer_id, subcategory_id) VALUES ($1, $2) ON CONFLICT (answer_id, subcategory_id) DO NOTHING', [answerId, subcategoryId]);
            await queryDatabase('INSERT INTO subcategory_relation (question_id, subcategory_id) VALUES ($1, $2)', [questionId, subcategoryId]);
          })
        });
  }
}

