import { expect } from 'chai';
import { extractVideoId } from '../../src/util';

describe('util', () => {

  describe('extractVideoId', () => {

    [
      'http://www.youtube.com/watch?v=dQw4w9WgXcQ',
      'http://youtu.be/dQw4w9WgXcQ',
      'http://www.youtube.com/embed/dQw4w9WgXcQ',
      'http://www.youtube.com/?v=dQw4w9WgXcQ',
      'http://www.youtube.com/v/dQw4w9WgXcQ',
      'http://www.youtube.com/e/dQw4w9WgXcQ',
      'http://www.youtube.com/watch?feature=player_embedded&v=dQw4w9WgXcQ',
      'http://www.youtube.com/?feature=player_embedded&v=dQw4w9WgXcQ'
    ].forEach(url => {
      it(`resolves url ${url}`, () => {
        return expect(
          extractVideoId(url)
        ).to.eventually.equal('dQw4w9WgXcQ');
      });
    });

    [
      '/watch?v=dQw4w9WgXcQ',
      '/embed/dQw4w9WgXcQ',
      '/?v=dQw4w9WgXcQ',
      '/v/dQw4w9WgXcQ',
      '/e/dQw4w9WgXcQ',
      '/watch?feature=player_embedded&v=dQw4w9WgXcQ',
      '/?feature=player_embedded&v=dQw4w9WgXcQ'
    ].forEach(path => {
      it(`resolves path ${path}`, () => {
        return expect(
          extractVideoId(path)
        ).to.eventually.equal('dQw4w9WgXcQ');
      });
    });

    [
      'http://www.youtube.com',
      'http://www.youtube.com/watch?v',
      'dQw4w9WgXcQ',
      'http://www.google.com'
    ].forEach(url => {
      it(`rejects ${url}`, () => {
        return expect(
          extractVideoId(url)
        ).to.be.rejectedWith('Invalid YouTube url.');
      });
    });

  });

});
