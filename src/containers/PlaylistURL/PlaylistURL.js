import React from "react";
import {connect} from "react-redux";
import {loadPlaylist} from "../../actions/playlist";
import Styles from "./PlaylistURL.css";

class PlaylistURL extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      playlistId: ""
    };

    this.handleUrlChange = this.handleUrlChange.bind(this);
    this.handleUrlSubmit = this.handleUrlSubmit.bind(this);
  }

  handleUrlChange(e) {
    this.setState({
      playlistId: e.target.value
    });
  }

  handleUrlSubmit() {
    this.props.loadPlaylist(this.state.playlistId);
  }

  render() {
    return (
      <div className={Styles.PlaylistURL}>
        <input type="text" value={this.state.playlistId} onChange={this.handleUrlChange}/>
        <input type="button" value="Load" onClick={this.handleUrlSubmit}/>
      </div>
    );
  }
}

PlaylistURL.propTypes = {
  loadPlaylist: React.PropTypes.func.isRequired
};

export default connect(null, (dispatch) => {
  return {
    loadPlaylist: (playlistId) => dispatch(loadPlaylist(playlistId))
  };
})(PlaylistURL);