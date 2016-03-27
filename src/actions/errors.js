import {
  SET_ID_ERROR,
  RESET_ID_ERROR,
  SET_CAPTIONS_ERROR,
  RESET_ERRORS
} from '../constants';

const setIdError = (errorMessage) => ({
  type: SET_ID_ERROR,
  errorMessage
});

const resetIdError = () => ({
  type: RESET_ID_ERROR
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
  resetIdError,
  setCaptionsError,
  resetErrors
};
