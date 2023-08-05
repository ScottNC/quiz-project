import { queryDatabase } from "../db";

interface ExternalSource {
  name: string,
  domain: string,
  apikey: string
  category_id: number
}

export async function populateDatabase() {

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
