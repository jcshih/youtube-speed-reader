import fetch from 'isomorphic-fetch';
import { push, replace } from 'react-router-redux';
import {
  SET_ID,
  SET_LOADING,
  SET_CAPTIONS
} from '../constants';
import { extractVideoId, getCaptions } from '../util';
import { setIdError, setCaptionsError } from './errors';

const checkStatus = (res) => {
  if (res.status >= 200 && res.status < 300) {
    return res;
  } else {
    throw res;
  }
};

const setId = (id) => ({
  type: SET_ID,
  id
});

const setLoading = (isLoading) => ({
  type: SET_LOADING,
  isLoading
});

const setCaptions = (captions) => ({
  type: SET_CAPTIONS,
  captions
});

const parseIdFromUrl = (url) => (dispatch) => {
  return extractVideoId(url)
    .then(id => {
      dispatch(push(`/v/${id}`));
    })
    .catch(err => {
      dispatch(setIdError(err));
    });
};

const parseIdFromPath = (path) => (dispatch) => {
  return extractVideoId(path)
    .then(id => {
      dispatch(replace(`/v/${id}`));
    })
    .catch(err => {
      dispatch(replace('/'));
      dispatch(setIdError(err));
    });
};

    });
};

export {
  setId,
  setLoading,
  setCaptions,
  parseIdFromUrl,
  parseIdFromPath,
};
