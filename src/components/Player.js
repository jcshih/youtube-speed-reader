import React, { Component, PropTypes } from 'react';
import YouTube from 'react-youtube';
import { delay } from '../util';
import Captions from './Captions';

class Player extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    captions: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      player: null,
      playing: false,
      currentTime: 0
    };
  }

  setPlaying(playing) {
    this.setState({ playing });
  }

  onReady(event) {
    this.setState({ player: event.target });
    this.startTimeLoop();
  }

  onStateChange(event) {
    switch (event.data) {
      case window.YT.PlayerState.ENDED:
      case window.YT.PlayerState.PAUSED:
      case window.YT.PlayerState.BUFFERING:
        this.setPlaying(false);
        break;
      default:
        return;
    }
  }

  startTimeLoop() {
    const { player, playing } = this.state;

    const pollCurrentTime = () => {
      return new Promise((resolve, reject) => {
        if (this.state.playing) {
          this.setState({ currentTime: player.getCurrentTime() });
        }
        resolve();
      });
    };

    const loop = () => {
      return pollCurrentTime().then(delay)
                              .then(() => {
                                if (this.refs.youtube) return loop();
                              });
    };
    Promise.resolve(0).then(loop);
  }

  seekTo(time) {
    this.state.player.seekTo(time);
  }

  render() {
    const { id, captions } = this.props;

    return (
      <div>
        <div>
          <YouTube
              ref="youtube"
              videoId={id}
              onReady={this.onReady.bind(this)}
              onPlay={this.setPlaying.bind(this, true)}
              onError={this.setPlaying.bind(this, false)}
              onStateChange={this.onStateChange.bind(this)} />
        </div>
        <div>
          <Captions
              captions={captions}
              currentTime={this.state.currentTime}
              seekTo={this.seekTo.bind(this)} />
        </div>
      </div>
    );
  }
}

export default Player;
