/*global YT*/
import React from "react";
import {connect} from "react-redux";

import {nextSong} from "../../actions/playlist";
import {pauseOrPlay} from "../../actions/ui";
import Timer from "./Timer.js";
import Styles from "./Player.css";

class YoutubeAPI {

  constructor() {

    this.player = null;
    this.currentVideo = null;
    this.listeners = [];

    this.SONG_END = "song_end";
  }

  cueVideo(videoId) {
    if (videoId == this.currentVideo) return;


    if (this.player == null) {
      this.player = new YT.Player("ytplayer", {
        height: "315",
        width: "560",
        videoId: videoId,
        playerVars: {"autoplay": 1},
        events: {
          "onStateChange": (state) => {
            if (state.data === 0) {
              this.emit(this.SONG_END);
            }
          }
        }
      });
    }
    else {
      this.player.loadVideoById({
        videoId: videoId,
        suggestedQuality: "medium"
      });
    }

    this.currentVideo = videoId;
  }

  addEventListener(callback) {
    this.listeners.push(callback);
  }

  removeEventListener(callback) {
    this.listeners = this.listeners.filter(
      function (item) {
        if (item !== callback) {
          return item;
        }
      }
    );
  }

  emit(event) {
    this.listeners.map((item) => {
      item(event);
    });
  }

  pause() {
    if (this.player) this.player.pauseVideo();
  }

  play() {
    if (this.player) this.player.playVideo();
  }

  getCurrentTime() {
    return (new Promise((res) => {

      let timer = setInterval(() => {
        if(this.player && typeof this.player.getCurrentTime != "undefined") {
          clearInterval(timer);
          res(this.player.getCurrentTime());
        }
      }, 250);
    }));
  }

  getDuration() {
    return (new Promise((res) => {

      let timer = setInterval(() => {
        if(this.player && typeof this.player.getDuration != "undefined" && this.player.getDuration()) {
          clearInterval(timer);
          res(this.player.getDuration());
        }
      }, 250);
    }));
  }
}

class Player extends React.Component {

  constructor(props) {
    super(props);

    this.handleSongEnd = this.handleSongEnd.bind(this);
    this.Youtube = new YoutubeAPI();
    this.Youtube.addEventListener(this.handleSongEnd);

    this.state = {
      timer: {
        isCounting: false,
        currentTime: 0,
        duration: 0
      }
    };

    this.timerInterval = null;
  }

  handleSongEnd(event) {
    if (event == this.Youtube.SONG_END) {
      this.props.nextSong();
    }
  }

  componentWillReceiveProps(newProps) {
    if (typeof this.Youtube.player == "object") {
      if (newProps.playbackState == "pause") {
        this.Youtube.pause();
        this.stopTimer();
      }
      else {
        this.Youtube.play();
        Promise.all([this.Youtube.getCurrentTime(), this.Youtube.getDuration()]).then((data) => {
          this.startTimer(data[0], data[1]);
        });

      }
    }
  }

  componentWillUnmount() {
    this.Youtube.removeEventListener(this.handleSongEnd);
    this.stopTimer();
  }

  componentDidUpdate() {
    this.Youtube.cueVideo(this.props.video.contentDetails.videoId);
  }

  startTimer(currentTime, duration) {
    clearInterval(this.timerInterval);
    this.setState({
      timer: {
        isCounting: true,
        currentTime,
        duration
      }
    }, () => {
      this.timerInterval = setInterval(() => {
        this.Youtube.getCurrentTime().then(currentTime => {
          this.setState({
            timer: Object.assign({}, this.state.timer, { currentTime })
          });
        })
      }, 1000);
    });
  }

  stopTimer() {
    this.setState({
      timer: Object.assign({}, this.state.timer, { isCounting: false })
    }, () => {
      clearInterval(this.timerInterval);
    });
  }

  render() {
    if (!this.props.video) return null;

    return (
      <div>
        <div style={{backgroundImage: "url(" + this.props.video.snippet.thumbnails.medium.url + ")"}}
             className={Styles.poster} onClick={this.props.handleClick}>
          <span className={Styles.Playback + " " + Styles["Playback--" + this.props.playbackState]}></span>
          <Timer currentTime={this.state.timer.currentTime} duration={this.state.timer.duration} />
        </div>

        <h1 className={Styles.h1}>{this.props.video.snippet.title}</h1>
        <div id="ytplayer" style={{display: "none"}}></div>
      </div>
    );
  }
}

Player.propTypes = {  
  nextSong: React.PropTypes.func.isRequired,
  playbackState: React.PropTypes.string.isRequired,
  video: React.PropTypes.shape({
    id: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired
  }).isRequired,
  handleClick: React.PropTypes.func.isRequired
};

export default connect((store) => {
  return {
    playbackState: store.ui.playbackState,
    video: function () {
      if (!store.songs.currentSong || store.songs.songs.length == 0) return null;
      return store.songs.songs.filter(item => {
        if (item.contentDetails.videoId == store.songs.currentSong) {
          return true;
        }
      })[0];
    }()
  };
}, (dispatch) => {
  return {
    handleClick: () => dispatch(pauseOrPlay()),
    nextSong: () => dispatch(nextSong())
  };
})(Player);