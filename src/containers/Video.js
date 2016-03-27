import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { setId, fetchCaptions } from '../actions/youtube';

class Video extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    setId: PropTypes.func.isRequired,
    fetchCaptions: PropTypes.func.isRequired,
    captions: PropTypes.object,
    error: PropTypes.string
  };

  componentWillMount() {
    const { id, setId, fetchCaptions } = this.props;
    setId(id);
    fetchCaptions(id);
  }

  _render() {
    const { isLoading, error, captions } = this.props;
    if (isLoading) {
      return 'loading';
    }
    if (error) {
      return error;
    }
    return JSON.stringify(captions);
  }

  render() {
    return (
      <div>
        {this._render()}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  id: ownProps.params.id,
  isLoading: state.youtube.isLoading,
  captions: state.youtube.captions,
  error: state.errors.captionsError
});

const mapDispatchToProps = (dispatch) => ({
  setId: (id) => dispatch(setId(id)),
  fetchCaptions: (id) => dispatch(fetchCaptions(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Video);
