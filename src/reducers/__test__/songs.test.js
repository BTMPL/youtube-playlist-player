import songsReducer from "../songs";
import * as actions from "../../actions/playlist";




describe("Songs reducer", () => {
  test("Returns default object on init", () => {
    expect(songsReducer().songs.length).toBe(0);
  });

  test("Adds songs to the list", () => {
    expect(songsReducer(undefined, actions.addSongs([{title: "test"}, {title:"test2"}])).songs.length).toBe(2);
  });

  test("Supports removing all songs", () => {
    expect(songsReducer({songs:[1,2,3]}, actions.clearSonglist()).songs.length).toBe(0)
  });

  test("Allows setting current song", () => {
    expect(songsReducer(undefined, actions.playSong(1)).currentSong).toBe(1);
  })

  Object.defineProperty(Math, 'random', { value: function() { return 0.1 } });
  test("Supports shuffling the list", () => {
    let state = songsReducer(undefined, actions.addSongs([{title: "test"}, {title:"test2"}]));
    state = songsReducer(state, actions.shufflePlaylist());
    expect(state.songs[0].title).toBe('test2');
  });

  test("Supports skipping songs and looping", () => {
    const song1 = {
      contentDetails: { videoId: 1}
    };
    const song2 = {
      contentDetails: { videoId: 2}
    };


    let state = songsReducer({ songs: [song1, song2], currentSong: 1});
    expect(songsReducer(state, actions.nextSong()).currentSong).toBe(2);
    expect(songsReducer(Object.assign({}, state, { currentSong: 2}), actions.nextSong()).currentSong).toBe(1);

    expect(songsReducer(state, actions.previousSong()).currentSong).toBe(2);
    expect(songsReducer(Object.assign({}, state, { currentSong: 2}), actions.previousSong()).currentSong).toBe(1);
  })
});

describe("Songs actions", () => {
  describe("loadPlaylist", () => {

    test("no results", () => {
      jest.mock('./__mocks__/axios');
      let axios = require('axios');
      axios.get.mockImplementation((p) => {
        return Promise.resolve({})
      });

      let dispatch = jest.fn();
      actions.loadPlaylist(1)(dispatch);
      expect(dispatch.mock.calls.length).toBe(1);
    });

    test("just one page of results", (done) => {
      jest.mock('./__mocks__/axios');
      let axios = require('axios');
      axios.get.mockImplementation((p) => {
        return Promise.resolve({
          data: {
            items: [
              {
                id: 1
              }
            ]
          }
        })
      });

      const dispatch = (obj) => {
        if(obj.type == 'song_add' && obj.songs[0].id == 1) {
          done();
        }
      }
      actions.loadPlaylist(1)(dispatch);
    });

    test("multiple pages of results", (done) => {
      jest.mock('./__mocks__/axios');
      let axios = require('axios');
      axios.get.mockImplementation((p) => {
        return Promise.resolve({
          data: {
            nextPageToken: 'token',
            items: [
              {
                id: 1
              }
            ]
          }
        })
      });

      const dispatch = (obj) => {
        if(typeof obj === 'function') {
          done();
        }
      }
      actions.loadPlaylist(1)(dispatch);
    });
  });


  describe("loadPlaylistNext", () => {

    test("no results", () => {
      jest.mock('./__mocks__/axios');
      let axios = require('axios');
      axios.get.mockImplementation((p) => {
        return Promise.resolve({})
      });

      let dispatch = jest.fn();
      actions.loadPlaylistNext(1)(dispatch);
      expect(dispatch.mock.calls.length).toBe(0);
    });

    test("just one page of results", (done) => {
      jest.mock('./__mocks__/axios');
      let axios = require('axios');
      axios.get.mockImplementation((p) => {
        return Promise.resolve({
          data: {
            items: [
              {
                id: 1
              }
            ]
          }
        })
      });

      const dispatch = (obj) => {
        if(obj.type == 'song_add' && obj.songs[0].id == 1) {
          done();
        }
      }
      actions.loadPlaylistNext(1)(dispatch);
    });

    test("multiple pages of results", (done) => {
      jest.mock('./__mocks__/axios');
      let axios = require('axios');
      axios.get.mockImplementation((p) => {
        return Promise.resolve({
          data: {
            nextPageToken: 'token',
            items: [
              {
                id: 1
              }
            ]
          }
        })
      });

      const dispatch = (obj) => {
        if(typeof obj === 'function') {
          done();
        }
      }
      actions.loadPlaylistNext(1)(dispatch);
    });
  });
})
