import { expect } from 'chai';
import { youtube } from '../../../src/reducers';
import {
  SET_ID,
  SET_LOADING,
  SET_CAPTIONS
} from '../../../src/constants';

describe('youtube reducer', () => {

  it('handles initial state', () => {
    expect(
      youtube(undefined, {})
    ).to.eql({
      id: null,
      isLoading: false,
      captions: null
    });
  });

  it('handles SET_ID', () => {
    const state = {
      id: null,
      isLoading: false,
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

  it('handles SET_LOADING', () => {
    const state = {
      id: 5,
      isLoading: false,
      captions: null
    };
    const nextState = {
      ...state,
      isLoading: true
    };

    expect(
      youtube(state, { type: SET_LOADING, isLoading: true })
    ).to.eql(nextState);
    expect(
      youtube(nextState, { type: SET_LOADING, isLoading: false })
    ).to.eql(state);
  });

  it('handles SET_CAPTIONS', () => {
    const captions = {
      transcript: {
        text: []
      }
    };
    const state = {
      id: 5,
      isLoading: false,
      captions: null
    };
    const nextState = {
      ...state,
      captions
    };

    expect(
      youtube(state, { type: SET_CAPTIONS, captions })
    ).to.eql(nextState);
  });

});
