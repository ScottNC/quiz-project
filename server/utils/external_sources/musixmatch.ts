import axios from 'axios';
import { queryDatabase } from '../../db';
import { MusiXGenre, MusiXTrack } from './musix_types';
import { decrypt } from '../../decryptor';

export async function populate(domain: string, encyptedApikey: string, category_id: number) {
  const apikey = decrypt(encyptedApikey);
  await getGenres(domain, apikey, category_id.toString());
}

async function getGenres(domain: string, apikey: string, categoryId: string) {

  const subcategories = await queryDatabase('SELECT name FROM subcategory WHERE category_id = $1', [categoryId]);

  const subNames = subcategories.map(subcategory => subcategory.name);

  axios.get(`${domain}music.genres.get`, {params: {apikey}})
    .then((response) => {
      return response.data?.message?.body?.music_genre_list
    })
    .then((genreList) => {
      const filteredList = genreList.filter((genre: MusiXGenre) => subNames.includes(genre.music_genre?.music_genre_name))
      sortSubcategory(domain, apikey, filteredList, categoryId);
    });
}

async function sortSubcategory(domain: string, apikey: string, genres: MusiXGenre[], categoryId: string) {
  const subcategories = await queryDatabase('SELECT id, name FROM subcategory WHERE category_id = $1', [categoryId]);

  const typeInfo = await queryDatabase('SELECT id from type WHERE name = \'Artist\'');

  const typeId = typeInfo[0].id;

  const decades = subcategories.filter(subcategory => {
    return subcategory.name.length === 5 && subcategory.name[4] === 's' && !isNaN(parseInt(subcategory.name.substr(0,4)))
  }).map(subcategory => ({
    id: subcategory.id,
    year: parseInt(subcategory.name.substr(0,4))
  }));

  decades.forEach(async (decade) => {
    genres.forEach(async ({ music_genre } : MusiXGenre) => {

      const genreId = subcategories.filter(subcategory => subcategory.name === music_genre.music_genre_name)[0]?.id;

      const f_track_release_group_first_release_date_min = decade.year.toString() + '0101';
      const f_track_release_group_first_release_date_max = (decade.year + 9).toString() + '1231';

      const f_lyrics_language = 'en';

      const params = {
          f_music_genre_id: music_genre.music_genre_id,
          f_lyrics_language,
          f_track_release_group_first_release_date_min,
          f_track_release_group_first_release_date_max,
          page_size: 5,
          s_track_rating: 'desc',
          apikey,
        }

      axios.get(`${domain}track.search`, { params })
        .then((response) => response.data?.message?.body?.track_list)
        .then(async (trackList) => {
          trackList.forEach(async ({ track }: MusiXTrack ) => {
            const { track_name, artist_name } = track;

            const { answerId, questionId } = await insertQuestion(track_name.replace(/'/g, "''"), artist_name, typeId.toString(), categoryId);

            await queryDatabase('INSERT INTO subcategory_relation (answer_id, subcategory_id) VALUES ($1, $2)', [answerId, decade.id]);
            await queryDatabase('INSERT INTO subcategory_relation (question_id, subcategory_id) VALUES ($1, $2)', [questionId, decade.id]);
            await queryDatabase('INSERT INTO subcategory_relation (answer_id, subcategory_id) VALUES ($1, $2)', [answerId, genreId]);
            await queryDatabase('INSERT INTO subcategory_relation (question_id, subcategory_id) VALUES ($1, $2)', [questionId, genreId]);
          })
        })
    })
  })
}

async function insertQuestion(song: string, artist: string, typeId: string, categoryId: string) {
  const answerString = `INSERT INTO answer (text, category_id, type_id) VALUES ($1, $2, $3) ON CONFLICT (text) DO NOTHING`;
  await queryDatabase(answerString, [artist, categoryId, typeId]);

  const answer = await queryDatabase(`SELECT id FROM answer WHERE text = $1 and category_id = $2`, [artist, categoryId]);

  const questionString = `INSERT INTO question (text, category_id, type_id, answer_id) VALUES ('Who Performed ${song}?', $1, $2, $3) RETURNING id`;
  const question = await queryDatabase(questionString, [categoryId, typeId, answer[0]?.id]);

  return { answerId: answer[0]?.id, questionId: question[0]?.id };
}
