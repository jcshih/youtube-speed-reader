import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { parseIdFromPath } from '../actions/youtube';

class IdParser extends Component {

  static propTypes = {
    path: PropTypes.string.isRequired,
    parseId: PropTypes.func.isRequired
  };

  componentWillMount() {
    const { path, parseId } = this.props;
    parseId(path);
  }

  render() {
    return (
      <div></div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { pathname, search } = ownProps.location;
  return {
    path: `${pathname}${search}`
  };
};

const mapDispatchToProps = (dispatch) => ({
  parseId: path => dispatch(parseIdFromPath(path))
});

export default connect(mapStateToProps, mapDispatchToProps)(IdParser);
