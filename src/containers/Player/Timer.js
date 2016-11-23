import React from "react";
import Styles from "./Timer.css";

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: Math.round(props.currentTime),
      duration: Math.round(props.duration)
    };
  }

  formatToTime(v) {
    let s = (v % 60);
    if(s < 10) s = "0" + s;
    return Math.floor(v / 60) + ":" + s;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      currentTime: Math.round(nextProps.currentTime),
      duration: Math.round(nextProps.duration)
    });
  }

  render() {
    return (
      <div className={Styles.Timer}>{this.formatToTime(this.state.currentTime)} / {this.formatToTime(this.state.duration)}</div>
    );
  }
}

Timer.propTypes = {
  currentTime: React.PropTypes.number.isRequired,
  duration: React.PropTypes.number.isRequired
};

Timer.defaultValue = {
  currentTime: 0,
  duration: 0
};

export default Timer;