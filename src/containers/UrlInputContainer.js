import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import UrlInput from '../components/UrlInput';
import { parseIdFromUrl, resetError } from '../actions/youtube';

const mapStateToProps = (state) => ({
  error: state.youtube.error
});

const mapDispatchToProps = (dispatch) => ({
  handleSubmit: url => dispatch(parseIdFromUrl(url)),
  resetError: () => dispatch(resetError())
});

const UrlInputContainer = connect(mapStateToProps, mapDispatchToProps)(UrlInput);

export default UrlInputContainer;
