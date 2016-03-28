import {
  SET_ID,
  SET_LOADING,
  SET_CAPTIONS
} from '../constants';

const initialState = {
  id: null,
  isLoading: false,
  captions: {
    transcript: {
      text: []
    }
  }
};

const youtube = (state = initialState, action) => {
  switch (action.type) {
    case SET_ID:
      return {
        ...state,
        id: action.id
      };

    case SET_LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      };

    case SET_CAPTIONS:
      return {
        ...state,
        captions: action.captions
      };

    default:
      return state;
  }
};

export default youtube;
