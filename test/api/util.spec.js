import { expect } from 'chai';
import { extractVideoId } from '../../api/util';

describe('api.util', () => {

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
      it(`resolves ${url}`, () => {
        return expect(
          extractVideoId(url)
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
        ).to.be.rejectedWith('Invalid YouTube URL.');
      });
    });

  });

});
