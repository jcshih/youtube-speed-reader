import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import UrlInputContainer from '../containers/UrlInputContainer';

class App extends Component {

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    pathname: PropTypes.string.isRequired,
    error: PropTypes.string
  };

  render() {
    return (
      <div>
        <div>
          <Link to='/'>home</Link>
          <Link to='/about'>about</Link>
          {this.props.pathname !== '/'
            ? <UrlInputContainer />
            : null}
        </div>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  error: state.youtube.error,
  pathname: ownProps.location.pathname
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit: url => dispatch(parseId(url))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
