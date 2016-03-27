import { expect } from 'chai';
import { errors } from '../../../src/reducers';
import {
  SET_ID_ERROR,
  RESET_ID_ERROR,
  SET_CAPTIONS_ERROR,
  RESET_ERRORS
} from '../../../src/constants';

describe('errors reducer', () => {

  it('handles initial state', () => {
    expect(
      errors(undefined, {})
    ).to.eql({
      idError: null,
      captionsError: null
    });
  });

  it('handles SET_ID_ERROR', () => {
    const state = {
      idError: null,
      captionsError: null
    };
    const nextState = {
      ...state,
      idError: 'id error'
    };

    expect(
      errors(state, {
        type: SET_ID_ERROR,
        errorMessage: 'id error'
      })
    ).to.eql(nextState);
  });

  it('handles RESET_ID_ERROR', () => {
    const state = {
      idError: 'id error',
      captionsError: 'captions error'
    };
    const nextState = {
      ...state,
      idError: null
    };

    expect(
      errors(state, { type: RESET_ID_ERROR })
    ).to.eql(nextState);
  });

  it('handles SET_CAPTIONS_ERROR', () => {
    const state = {
      idError: null,
      captionsError: null
    };
    const nextState = {
      ...state,
      captionsError: 'captions error'
    };

    expect(
      errors(state, {
        type: SET_CAPTIONS_ERROR,
        errorMessage: 'captions error'
      })
    ).to.eql(nextState);
  });

  it('handles RESET_ERRORS', () => {
    const state = {
      idError: 'id error',
      captionsError: 'captions error'
    };
    const nextState = {
      idError: null,
      captionsError: null
    };

    expect(
      errors(state, { type: RESET_ERRORS })
    ).to.eql(nextState);
  });

});
