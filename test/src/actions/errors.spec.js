import { expect } from 'chai';
import {
  setIdError,
  setCaptionsError,
  resetErrors
} from '../../../src/actions/errors';
import {
  SET_ID_ERROR,
  SET_CAPTIONS_ERROR,
  RESET_ERRORS
} from '../../../src/constants';

describe('errors actions', () => {

  it('handles setIdError', () => {
    expect(
      setIdError('id error')
    ).to.eql({
      type: SET_ID_ERROR,
      errorMessage: 'id error'
    });
  });

  it('handles setCaptionsError', () => {
    expect(
      setCaptionsError('captions error')
    ).to.eql({
      type: SET_CAPTIONS_ERROR,
      errorMessage: 'captions error'
    });
  });

  it('handles resetErrors', () => {
    expect(
      resetErrors()
    ).to.eql({
      type: RESET_ERRORS
    });
  });

});
