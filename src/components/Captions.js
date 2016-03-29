import React, { PropTypes } from 'react';
import styles from './Captions.css';

const isActive = (currentTime, start, duration) => {
  return currentTime >= start && currentTime < start + duration;
};

const Captions = (props) => (
  <div className={styles.captions}>
    {props.captions.map(line => (
       <div key={line.start}>
         <span
             className={isActive(props.currentTime, line.start, line.dur)
                 ? styles.activeTime : ''}
             onClick={() => props.seekTo(line.start)}>
           {line.start}
         </span>
         {' '}
         {line['$t']}
       </div>
     ))}
  </div>
);

Captions.propTypes = {
  captions: PropTypes.array.isRequired,
  currentTime: PropTypes.number.isRequired,
  seekTo: PropTypes.func.isRequired
};

export default Captions;
