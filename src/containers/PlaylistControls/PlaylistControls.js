import React from "react";
import {connect} from "react-redux";

import {shufflePlaylist, nextSong, previousSong} from "../../actions/playlist";
import {pauseOrPlay} from "../../actions/ui";

import Styles from "./PlaylistControls.css";

class PlaylistControls extends React.Component {

  render() {
    return (
      <div className={Styles.PlaylistControls}>
        <button onClick={this.props.handleShuffle}>Shuffle</button>
        <button onClick={this.props.handleNextSong}>Next</button>
        <button onClick={this.props.handlePreviousSong}>Previous</button>
        <button onClick={this.props.handlePause}>Pause / Play</button>
      </div>
    );
  }
}

PlaylistControls.propTypes = {
  handleNextSong: React.PropTypes.func.isRequired,
  handlePause: React.PropTypes.func.isRequired,
  handlePreviousSong: React.PropTypes.func.isRequired,
  handleShuffle: React.PropTypes.func.isRequired
};

export default connect(null, (dispatch) => {
  return {
    handleShuffle: () => dispatch(shufflePlaylist()),
    handleNextSong: () => dispatch(nextSong()),
    handlePreviousSong: () => dispatch(previousSong()),
    handlePause: () => {
      dispatch(pauseOrPlay());
    }
  };
})(PlaylistControls);