import React from 'react';

class App extends React.Component {
  render() {
    return (
      <div>
        App
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;
