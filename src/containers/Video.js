import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Loading from '../components/Loading';
import Error from '../components/Error';
import Player from '../components/Player';
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

  _render() {
    const { id, isLoading, error, captions } = this.props;
    if (isLoading) {
      return <Loading />;
    }
    if (error) {
      return <Error error={error} />;
    }
    return <Player id={id} captions={captions.transcript.text} />
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
