import React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";

import App from "./components/App/App";

import store from "./store";

import {addSongs} from "./actions/playlist";

if (window.localStorage.getItem("playlist")) {
  store.dispatch(addSongs(JSON.parse(window.localStorage.getItem("playlist"))));
}

render(<Provider store={store}><App /></Provider>, document.getElementById("root"));