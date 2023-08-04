import axios from 'axios';
import { queryDatabase } from '../../db';
import { MusiXGenre, MusiXTrack } from './musix_types';
import { decrypt } from '../../decryptor';

export async function populate(domain: string, encyptedApikey: string) {
  const apikey = decrypt(encyptedApikey);
  await getGenres(domain, apikey);
}

async function getGenres(domain: string, apikey: string) {

  const subcategories = await queryDatabase('SELECT name FROM subcategory');

  const subNames = subcategories.map(subcategory => subcategory.name);

  axios.get(`${domain}music.genres.get`, {params: {apikey}})
    .then((response) => {
      return response.data?.message?.body?.music_genre_list
    })
    .then((genreList) => {
      const filteredList = genreList.filter((genre: MusiXGenre) => subNames.includes(genre.music_genre?.music_genre_name))
      sortSubcategory(domain, apikey, filteredList);
    });
}

async function sortSubcategory(domain: string, apikey: string, genres: MusiXGenre[]) {
  const subcategories = await queryDatabase('SELECT id, name FROM subcategory');

  const typeInfo = await queryDatabase('SELECT id from type WHERE name = \'Artist\'');

  const typeId = typeInfo[0].id;

  const decades = subcategories.filter(subcategory => {
    return subcategory.name.length === 5 && subcategory.name[4] === 's' && !isNaN(parseInt(subcategory.name.substr(0,4)))
  }).map(subcategory => ({
    id: subcategory.id,
    year: parseInt(subcategory.name.substr(0,4))
  }));

  console.log(decades.length, genres.length);

  decades.forEach(async (decade) => {
    genres.forEach(async ({ music_genre } : MusiXGenre) => {
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

            await insertQuestion(track_name.replace(/'/g, "''"), artist_name, typeId.toString());
          })
        })
    })
  })
}

async function insertQuestion(song: string, artist: string, typeId: string) {
  const answerId = await queryDatabase(`INSERT INTO answer (text, category_id, type_id) VALUES ($1, 1, $2) ON CONFLICT (text) DO NOTHING RETURNING id`,[artist, typeId]);

  let questionId: any = null;
  if (answerId.length) {
    const queryString = `INSERT INTO question (text, category_id, type_id, answer_id) VALUES ('Who Performed ${song}?', 1, $1, $2) returning id`;
    questionId = await queryDatabase(queryString, [typeId, answerId[0].id]);
  }

  return { answerId, questionId };
}
