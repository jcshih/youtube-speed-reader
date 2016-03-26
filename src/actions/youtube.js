import { SET_ID, SET_ERROR, RESET_ERROR } from '../constants';
import { extractVideoId } from '../util';
import { push, replace } from 'react-router-redux';

const setId = (id) => ({
  type: SET_ID,
  id
});

const setError = (errorMessage) => ({
  type: SET_ERROR,
  errorMessage
});

const resetError = () => ({
  type: RESET_ERROR
});

const parseIdFromUrl = (url) => (dispatch) => {
  return extractVideoId(url)
    .then(id => {
      dispatch(setId(id));
      dispatch(push(`/v/${id}`));
    })
    .catch(err => {
      dispatch(setError(err));
    });
};

const parseIdFromPath = (path) => (dispatch) => {
  return extractVideoId(path)
    .then(id => {
      dispatch(setId(id));
      dispatch(replace(`/v/${id}`));
    })
    .catch(err => {
      dispatch(replace('/'));
      dispatch(setError(err));
    });
};

export {
  setId,
  setError,
  resetError,
  parseIdFromUrl,
  parseIdFromPath
};
