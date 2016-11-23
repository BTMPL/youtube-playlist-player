import {SONG_ADD, SONG_CLEAR, SONG_SHUFFLE, SONG_PLAY, SONG_SKIP} from "../actions/playlist";
const defaultState = {
  songs: [],
  currentSong: null
};
export default (state = defaultState, action) => {
  switch (action.type) {
    case SONG_CLEAR:
      return Object.assign({}, state, {songs: []});

    case SONG_ADD:
      return Object.assign({}, state, {songs: [...state.songs, ...action.songs]});

    case SONG_SHUFFLE:
      return Object.assign({}, state, {
        songs: state.songs.slice(0, state.length).sort(() => {
          return 0.5 - Math.random();
        })
      });

    case SONG_SKIP: {
      let index = state.songs.findIndex((item) => {
        if (item.contentDetails.videoId === state.currentSong) return 1;
      });


      if (action.delta == 1) {
        if (index == state.songs.length - 1) index = 0;
        else index += action.delta;
      }
      else {
        if (index == 0) index = state.songs.length - 1;
        else index += action.delta;
      }

      return Object.assign({}, state, {currentSong: state.songs[index].contentDetails.videoId});
    }


    case SONG_PLAY:
      return Object.assign({}, state, {currentSong: action.videoId});
  }

  return state;
};