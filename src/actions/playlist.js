import axios from "axios";

export const SONG_PLAY = "song_play";
export const SONG_ADD = "song_add";
export const SONG_CLEAR = "song_clear";
export const SONG_SHUFFLE = "song_shuffle";
export const SONG_SKIP = "song_skip";

export const PLAYLIST_LOAD = "playlist_load";
export const PLAYLIST_LOAD_NEXT = "playlist_load_next";

const YOUTUBE_KEY = "AIzaSyDSj6pydOPRW2ANkpGFPuoHJIes88GakG4";


export function playSong(videoId) {
  return {
    type: SONG_PLAY,
    videoId
  };
}

export function clearSonglist() {
  return {
    type: SONG_CLEAR
  };
}

export function addSongs(songs) {
  return {
    type: SONG_ADD,
    songs
  };
}

export function shufflePlaylist() {
  return {
    type: SONG_SHUFFLE
  };
}

export function nextSong() {
  return {
    type: SONG_SKIP,
    delta: +1
  };
}

export function previousSong() {
  return {
    type: SONG_SKIP,
    delta: -1
  };
}

export function loadPlaylist(playlistId) {
  return (dispatch) => {
    dispatch(clearSonglist());
    axios.get(`https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${playlistId}&part=contentDetails,snippet&key=${YOUTUBE_KEY}&maxResults=50`)
      .then((response) => {
        if (response.data && response.data.items) {
          dispatch(addSongs(response.data.items));
          if (response.data.nextPageToken) {
            dispatch(loadPlaylistNext(playlistId, response.data.nextPageToken));
          }
        }
      });
  };
}


export function loadPlaylistNext(playlistId, token) {
  return (dispatch) => {
    axios.get(`https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${playlistId}&part=contentDetails,snippet&key=${YOUTUBE_KEY}&maxResults=50&pageToken=${token}`)
      .then((response) => {
        if (response.data && response.data.items) {
          dispatch(addSongs(response.data.items));
          if (response.data.nextPageToken) {
            dispatch(loadPlaylistNext(playlistId, response.data.nextPageToken));
          }
        }
      });
  };
}

