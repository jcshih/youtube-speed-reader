import { expect } from 'chai';
import { push, replace } from 'react-router-redux';
import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import {
  setId,
  setLoading,
  setCaptions,
  parseIdFromUrl,
  parseIdFromPath,
  fetchCaptions
} from '../../../src/actions/youtube';
import {
  SET_ID,
  SET_LOADING,
  SET_CAPTIONS,
  SET_ID_ERROR,
  SET_CAPTIONS_ERROR
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

  it('handles setLoading', () => {
    expect(
      setLoading(true)
    ).to.eql({
      type: SET_LOADING,
      isLoading: true
    });
  });

  it('handles setCaptions', () => {
    const captions = {
      transcript: {
        text: []
      }
    };

    expect(
      setCaptions(captions)
    ).to.eql({
      type: SET_CAPTIONS,
      captions
    });
  });

  it('handles parseIdFromUrl success', (done) => {
    const expectedActions = [
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
      { type: SET_ID_ERROR, errorMessage: 'Invalid YouTube url.' }
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
      { type: SET_ID_ERROR, errorMessage: 'Invalid YouTube url.' }
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

  it('handles fetchCaptions success', (done) => {
    const captions = {
      transcript: {
        text: []
      }
    };

    nock('http://localhost:8000')
      .get('/api/captions/FxSmBbXSDl0')
      .reply(200, captions);

    const expectedActions = [
      { type: SET_LOADING, isLoading: true },
      { type: SET_CAPTIONS, captions },
      { type: SET_LOADING, isLoading: false },
    ];
    const store = mockStore({});

    store.dispatch(
      fetchCaptions('FxSmBbXSDl0')
    ).then(() => {
      expect(
        store.getActions()
      ).to.eql(expectedActions);
    }).then(done).catch(done);
  });

  it('handles fetchCaptions failure', (done) => {
    nock('http://localhost:8000')
      .get('/api/captions/FxSmBbXSDl0')
      .reply(500, { error: 'error' });

    const expectedActions = [
      { type: SET_LOADING, isLoading: true },
      { type: SET_CAPTIONS_ERROR, errorMessage: 'error' },
      { type: SET_LOADING, isLoading: false },
    ];
    const store = mockStore({});

    store.dispatch(
      fetchCaptions('FxSmBbXSDl0')
    ).then(() => {
      expect(
        store.getActions()
      ).to.eql(expectedActions);
    }).then(done).catch(done);
  });
});
