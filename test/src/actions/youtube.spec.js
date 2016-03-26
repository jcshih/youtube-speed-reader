import { expect } from 'chai';
import { push, replace } from 'react-router-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import {
  setId,
  setError,
  resetError,
  parseIdFromUrl,
  parseIdFromPath
} from '../../../src/actions/youtube';
import {
  SET_ID,
  SET_ERROR,
  RESET_ERROR
} from '../../../src/constants';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('youtube actions', () => {

  it('handles setId', () => {
    expect(
      setId(1)
    ).to.eql({
      type: SET_ID,
      id: 1
    });
  });

  it('handles setError', () => {
    expect(
      setError('error message')
    ).to.eql({
      type: SET_ERROR,
      errorMessage: 'error message'
    });
  });

  it('handles resetError', () => {
    expect(
      resetError()
    ).to.eql({
      type: RESET_ERROR
    });
  });

  it('handles parseIdFromUrl success', (done) => {
    const expectedActions = [
      { type: SET_ID, id: 'dQw4w9WgXcQ' },
      push('/v/dQw4w9WgXcQ')
    ];
    const store = mockStore({});

    store.dispatch(
      parseIdFromUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
    ).then(() => {
      expect(
        store.getActions()
      ).to.eql(expectedActions);
    }).then(done).catch(done);
  });

  it('handles parseIdFromUrl failure', (done) => {
    const expectedActions = [
      { type: SET_ERROR, errorMessage: 'Invalid YouTube URL.' }
    ];
    const store = mockStore({});

    store.dispatch(
      parseIdFromUrl('youtube.com/watch')
    ).then(() => {
      expect(
        store.getActions()
      ).to.eql(expectedActions);
    }).then(done).catch(done);
  });

  it('handles parseIdFromPath success', (done) => {
    const expectedActions = [
      { type: SET_ID, id: 'dQw4w9WgXcQ' },
      replace('/v/dQw4w9WgXcQ')
    ];
    const store = mockStore({});

    store.dispatch(
      parseIdFromPath('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
    ).then(() => {
      expect(
        store.getActions()
      ).to.eql(expectedActions);
    }).then(done).catch(done);
  });

  it('handles parseIdFromPath failure', (done) => {
    const expectedActions = [
      replace('/'),
      { type: SET_ERROR, errorMessage: 'Invalid YouTube URL.' }
    ];
    const store = mockStore({});

    store.dispatch(
      parseIdFromPath('youtube.com/watch')
    ).then(() => {
      expect(
        store.getActions()
      ).to.eql(expectedActions);
    }).then(done).catch(done);
  });
});
