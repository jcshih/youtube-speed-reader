import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import UrlInput from '../components/UrlInput';
import { parseIdFromUrl } from '../actions/youtube';
import { resetErrors } from '../actions/errors';

const mapStateToProps = (state) => ({
  error: state.errors.idError
});

const mapDispatchToProps = (dispatch) => ({
  handleSubmit: url => dispatch(parseIdFromUrl(url)),
  resetErrors: () => dispatch(resetErrors())
});

const UrlInputContainer = connect(mapStateToProps, mapDispatchToProps)(UrlInput);

export default UrlInputContainer;
