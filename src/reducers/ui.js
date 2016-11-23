import {PAUSE_OR_PLAY} from "../actions/ui";
import {SONG_PLAY} from "../actions/playlist";

const defaultState = {
  playbackState: "pause"
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case SONG_PLAY:
      return Object.assign({}, state, {playbackState: "play"});

    case PAUSE_OR_PLAY: {
      let newState = "pause";
      if (state.playbackState == "pause") {
        newState = "play";
      }

      return Object.assign({}, state, {playbackState: newState});
    }
  }

  return state;

};