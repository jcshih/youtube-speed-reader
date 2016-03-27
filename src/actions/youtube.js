import fetch from 'isomorphic-fetch';
import { push, replace } from 'react-router-redux';
import Config from '../../config.js';
import {
  SET_ID,
  SET_LOADING,
  SET_CAPTIONS
} from '../constants';
import { extractVideoId } from '../util';
import { setIdError, setCaptionsError } from './errors';

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

const fetchCaptions = (id) => (dispatch) => {
  dispatch(setLoading(true));

  return fetch(`${Config.serverUrl}/api/captions/${id}`)
    .then(res => Promise.all([ res.status, res.json() ]))
    .then(([ status, data ]) => {
      if (status >= 200 && status < 400) {
        return data;
      } else {
        throw data.error;
      }
    })
    .then(captions => {
      dispatch(setCaptions(captions));
      dispatch(setLoading(false));
    })
    .catch(err => {
      dispatch(setCaptionsError(err));
      dispatch(setLoading(false));
    });
};

export {
  setId,
  setLoading,
  setCaptions,
  parseIdFromUrl,
  parseIdFromPath,
  fetchCaptions
};
