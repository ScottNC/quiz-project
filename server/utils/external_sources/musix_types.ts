export interface MusiXGenre {
  music_genre : {
    music_genre_id: number,
    music_genre_parent_id: number,
    music_genre_name: string,
    music_genre_name_extended: string,
    music_genre_vanity: string
  }
}

export interface MusiXTrack {
  track :{
    track_name: string,
    artist_name: string
  }
}