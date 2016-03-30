import React, { Component, PropTypes } from 'react';
import { Row, Col } from 'react-bootstrap';
import YouTube from 'react-youtube';
import { delay } from '../util';
import Captions from './Captions';

const youTubeOpts = {
  width: '100%'
};

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
      currentTime: 0,
      autoScroll: true
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

  toggleAutoScroll() {
    this.setState({ autoScroll: !this.state.autoScroll });
  }

  render() {
    const { id, captions } = this.props;

    return (
      <div>
        <Row>
          <Col md={6}>
            <YouTube
                ref="youtube"
                videoId={id}
                opts={youTubeOpts}
                onReady={this.onReady.bind(this)}
                onPlay={this.setPlaying.bind(this, true)}
                onError={this.setPlaying.bind(this, false)}
                onStateChange={this.onStateChange.bind(this)} />
            <div>
              <label className="pull-right">
                <input
                    style={{ marginRight: '5px' }}
                    type="checkbox"
                    checked={this.state.autoScroll}
                    onChange={this.toggleAutoScroll.bind(this)} />
                auto-scroll
              </label>
            </div>
          </Col>
          <Col md={6}>
            <Captions
                captions={captions}
                currentTime={this.state.currentTime}
                autoScroll={this.state.autoScroll}
                seekTo={this.seekTo.bind(this)} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Player;
