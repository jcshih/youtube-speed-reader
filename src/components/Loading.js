import React from 'react';
import ReactLoading from 'react-loading';

const loadingStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)'
};

const Loading = () => (
  <div style={loadingStyle}>
    <ReactLoading
        type="spokes"
        height={150}
        width={150}
        color="#add8e6" />
  </div>
);

export default Loading;
