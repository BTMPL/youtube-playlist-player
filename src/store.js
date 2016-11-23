import {createStore, combineReducers, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";

import songs from "./reducers/songs";
import ui from "./reducers/ui";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(combineReducers({
  ui,
  songs
}), composeEnhancers(applyMiddleware(thunk)));