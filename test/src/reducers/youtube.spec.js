import { expect } from 'chai';
import { youtube } from '../../../src/reducers';
import {
  SET_ID,
  SET_ERROR,
  RESET_ERROR
} from '../../../src/constants';

describe('youtube reducer', () => {

  it('handles initial state', () => {
    expect(
      youtube(undefined, {})
    ).to.eql({
      id: null,
      isLoading: false,
      error: null,
      captions: null
    });
  });

  it('handles SET_ID', () => {
    const state = {
      id: null,
      isLoading: false,
      error: null,
      captions: null
    };
    const nextState = {
      ...state,
      id: 5
    };

    expect(
      youtube(state, {
        type: SET_ID,
        id: 5
      })
    ).to.eql(nextState);
  });

  it('handles SET_ERROR', () => {
    const state = {
      id: 5,
      isLoading: false,
      error: null,
      captions: null
    };
    const nextState = {
      ...state,
      error: 'error message'
    };

    expect(
      youtube(state, {
        type: SET_ERROR,
        errorMessage: 'error message'
      })
    ).to.eql(nextState);
  });

  it('handles RESET_ERROR', () => {
    const state = {
      id: 5,
      isLoading: false,
      error: 'error message',
      captions: null
    };
    const nextState = {
      ...state,
      error: null
    };

    expect(
      youtube(state, { type: RESET_ERROR })
    ).to.eql(nextState);
  });

});
