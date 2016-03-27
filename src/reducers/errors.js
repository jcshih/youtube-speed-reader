import {
  SET_ID_ERROR,
  SET_CAPTIONS_ERROR,
  RESET_ERRORS
} from '../constants';

const initialState = {
  idError: null,
  captionsError: null
};

const errors = (state = initialState, action) => {
  switch (action.type) {
    case SET_ID_ERROR:
      return {
        ...state,
        idError: action.errorMessage
      };

    case SET_CAPTIONS_ERROR:
      return {
        ...state,
        captionsError: action.errorMessage
      };

    case RESET_ERRORS:
      return initialState;

    default:
      return state;
  }
};

export default errors;
