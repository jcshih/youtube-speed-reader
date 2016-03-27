import {
  SET_ID_ERROR,
  SET_CAPTIONS_ERROR,
  RESET_ERRORS
} from '../constants';

const setIdError = (errorMessage) => ({
  type: SET_ID_ERROR,
  errorMessage
});

const setCaptionsError = (errorMessage) => ({
  type: SET_CAPTIONS_ERROR,
  errorMessage
});

const resetErrors = () => ({
  type: RESET_ERRORS
});

export {
  setIdError,
  setCaptionsError,
  resetErrors
};
