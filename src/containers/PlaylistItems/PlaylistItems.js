import React from "react";
import {connect} from "react-redux";

import {playSong} from "../../actions/playlist";

import Styles from "./PlaylistItems.css";

export class PlaylistItem extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.playSong(this.props.item.contentDetails.videoId);
  }

  render() {
    if (!this.props.item.id) return null;

    return (
      <div onClick={this.handleClick}
           className={Styles.PlaylistItem + " " + (this.props.current ? Styles["PlaylistItem--current"] : "")}>
        {this.props.item.snippet.title}
      </div>
    );
  }
}

PlaylistItem.propTypes = {
  current: React.PropTypes.bool.isRequired,
  item: React.PropTypes.object,
  playSong: React.PropTypes.func.isRequired
};


export class PlaylistItems extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.items.length !== 0) window.localStorage.setItem("playlist", JSON.stringify(nextProps.items));
    else window.localStorage.removeItem("playlist");
  }

  render() {
    return (
      <div>
        {this.props.items.map((item, index) => <PlaylistItem playSong={this.props.playSong} key={index} item={item}
                                                                      current={item.contentDetails.videoId == this.props.currentSong}/>)}
      </div>
    );
  }
}

PlaylistItems.defaultProps = {
  items: [],
  currentSong: null
};

PlaylistItems.propTypes = {
  currentSong: React.PropTypes.string,
  items: React.PropTypes.array.isRequired,
  playSong: React.PropTypes.func.isRequired
};

export default connect((store) => {
  return {
    currentSong: store.songs.currentSong,
    items: store.songs.songs,
  };
}, (dispatch) => {
  return {
    playSong: (videoId) => dispatch(playSong(videoId))
  }
})(PlaylistItems);