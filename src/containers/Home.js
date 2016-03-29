import React, { Component } from 'react';
import { Link } from 'react-router';
import { Row } from 'react-bootstrap';
import UrlInputContainer from '../containers/UrlInputContainer';

class Home extends Component {

  render() {
    return (
      <Row>
        <div style={{ textAlign: 'center' }}>
          <h2>
            Scan YouTube videos quickly using captions.
          </h2>
          <h4 style={{ marginBottom: '50px' }}>
            <Link to="/v/HAnw168huqA">Try it out!</Link>
          </h4>
          <UrlInputContainer autoFocus={true} />
        </div>
      </Row>
    );
  }
}

export default Home;
