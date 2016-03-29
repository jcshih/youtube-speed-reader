import React, { PropTypes } from 'react';

const Error = (props) => (
  <div>
    {props.error}
  </div>
);

Error.propTypes = {
  error: PropTypes.string.isRequired
};

export default Error;
