import React, {Component} from "react";

import Styles from "./App.css";
import PlaylistURL from "../../containers/PlaylistURL/PlaylistURL";
import PlaylistItems from "../../containers/PlaylistItems/PlaylistItems";
import PlaylistControls from "../../containers/PlaylistControls/PlaylistControls";
import Player from "../../containers/Player/Player";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={Styles.App}>
        <PlaylistURL />
        <Player />
        <PlaylistControls />
        <PlaylistItems />
      </div>
    );
  }
}

export default App;