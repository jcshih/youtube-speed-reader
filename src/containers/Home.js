import React, { Component } from 'react';
import UrlInputContainer from '../containers/UrlInputContainer';

class Home extends Component {

  render() {
    return (
      <div>
        <UrlInputContainer autoFocus={true} />
      </div>
    );
  }
}

export default Home;
