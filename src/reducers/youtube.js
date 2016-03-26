import { SET_ID, SET_ERROR, RESET_ERROR } from '../constants';

const initialState = {
  id: null,
  isLoading: false,
  error: null,
  captions: null
};

const youtube = (state = initialState, action) => {
  switch (action.type) {
    case SET_ID:
      return {
        ...state,
        id: action.id
      };

    case SET_ERROR:
      return {
        ...state,
        error: action.errorMessage
      };

    case RESET_ERROR:
      return {
        ...state,
        error: null
      };

    default:
      return state;
  }
};

export default youtube;
