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
          <p>
            Enter a YouTube url below or add "speedreader" to the domain of a YouTube url. <br /> ie. https://www.youtube.com/watch?v=IgKWPdJWuBQ -> https://www.youtubespeedreader.com/watch?v=IgKWPdJWuBQ
          </p>
          <h4 style={{ marginBottom: '50px' }}>
            <Link to="/v/IgKWPdJWuBQ">Try it out!</Link>
          </h4>
          <UrlInputContainer autoFocus={true} />
        </div>
      </Row>
    );
  }
}

export default Home;
