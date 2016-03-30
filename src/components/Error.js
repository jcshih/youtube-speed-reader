import React, { PropTypes } from 'react';
import { Row } from 'react-bootstrap';

const Error = (props) => (
  <Row className="text-center">
    <h1>Error :(</h1>
    <br />
    <p>{props.error}</p>
  </Row>
);

Error.propTypes = {
  error: PropTypes.string.isRequired
};

export default Error;
