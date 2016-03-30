import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import styles from './Caption.css';

const formatTime = (secs) => {
  const minutes = Math.floor(secs / 60);
  const seconds = ('0' + Math.floor(secs % 60)).slice(-2);
  return `${minutes}:${seconds}`;
};

class Caption extends Component {

  static propTypes = {
    active: PropTypes.bool.isRequired,
    start: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    handleClick: PropTypes.func.isRequired
  };

  render() {
    const { active, start, text, handleClick } = this.props;

    return (
      <div className={styles.caption}>
        <span
            className={classNames(styles.time, active ? styles.activeTime : '')}
            onClick={handleClick}>
          {formatTime(start)}
        </span>
        {' '}
        <span className={active ? styles.activeText : ''}>
          {text}
        </span>
      </div>
    );
  }
}

export default Caption;
