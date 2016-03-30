import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import Caption from './Caption';
import styles from './Captions.css';

const isActive = (currentTime, start, duration) => {
  return currentTime >= start && currentTime < start + duration;
};

class Captions extends Component {

  static propTypes = {
    captions: PropTypes.array.isRequired,
    currentTime: PropTypes.number.isRequired,
    seekTo: PropTypes.func.isRequired,
    autoScroll: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      activeCaptionKey: null
    };
  }

  componentDidUpdate() {
    if (!this.props.autoScroll) return;

    const activeCaption = this.refs.activeCaption;
    const nextKey = activeCaption ? activeCaption.props.start : null;

    if (this.state.activeCaptionKey !== nextKey && nextKey !== null) {
      const captionsNode = findDOMNode(this.refs.captions);
      const activeCaptionNode = findDOMNode(activeCaption);
      const scrollOffset = captionsNode.clientHeight / 2;

      captionsNode.scrollTop = activeCaptionNode.offsetTop - scrollOffset;
      this.setState({ activeCaptionKey: nextKey });
    }
  }

  render() {
    const { currentTime, captions, seekTo } = this.props;

    return (
      <div
          className={styles.captions}
          ref="captions">
        {captions.map(line => {
           const { start, dur, $t: text } = line;
           const active = isActive(currentTime, start, dur);
           const captionProps = {
             active,
             start,
             text,
             key: start,
             handleClick: () => seekTo(start)
           };
           if (active) {
             captionProps.ref = 'activeCaption';
           }

           return <Caption {...captionProps} />
         })}
      </div>
    );
  }
}

export default Captions;
