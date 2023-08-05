import { queryDatabase } from "../db";

interface ExternalSource {
  name: string,
  domain: string,
  apikey: string
}

export async function populateDatabase() {

  await queryDatabase('DELETE FROM subcategory_relation');
  await queryDatabase('DELETE FROM quiz_question_relation');
  await queryDatabase('DELETE FROM question');
  await queryDatabase('DELETE FROM answer');
  await queryDatabase('DELETE FROM round');
  await queryDatabase('DELETE FROM quiz');

  const externalSources: ExternalSource[] = await queryDatabase('SELECT name, domain, apikey FROM external_source');

  externalSources.forEach(async (source: ExternalSource) => {
    const { populate } = require('./external_sources/' + source.name);
    await populate(source.domain, source.apikey);
  });
}
