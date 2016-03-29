import { expect } from 'chai';
import fs from 'fs';
import nock from 'nock';
import {
  getCaptionInfo,
  getCaptions,
  getAsr,
  convertCaptionsToJson
} from '../../api/youtube';

describe('youtube api', () => {

  describe('getCaptionInfo', () => {
    afterEach(() => nock.cleanAll());

    it('captions available', () => {
      const videoInfo = fs.readFileSync(
        './test/data/FxSmBbXSDl0_info', 'utf8'
      );
      const ttsurl = fs.readFileSync(
        './test/data/FxSmBbXSDl0_ttsurl', 'utf8'
      );
      nock('http://www.youtube.com')
        .get('/get_video_info')
        .query({ video_id: 'FxSmBbXSDl0' })
        .reply(200, videoInfo);

      return expect(
        getCaptionInfo('FxSmBbXSDl0')
      ).to.eventually.equal(ttsurl);
    });

    it('asr captions available', () => {
      const videoInfo = fs.readFileSync(
        './test/data/V7Er7PZqycM_info', 'utf8'
      );
      const ttsurl = fs.readFileSync(
        './test/data/V7Er7PZqycM_ttsurl', 'utf8'
      );
      nock('http://www.youtube.com')
        .get('/get_video_info')
        .query({ video_id: 'V7Er7PZqycM' })
        .reply(200, videoInfo);

      return expect(
        getCaptionInfo('V7Er7PZqycM')
      ).to.eventually.equal(ttsurl);
    });

    it('no captions available', () => {
      const videoInfo = fs.readFileSync(
        './test/data/x2o2mHY4-2I_info', 'utf8'
      );
      nock('http://www.youtube.com')
        .get('/get_video_info')
        .query({ video_id: 'x2o2mHY4-2I' })
        .reply(200, videoInfo);

      return expect(
        getCaptionInfo('x2o2mHY4-2I')
      ).to.be.rejectedWith('No captions available.');
    });

    it('handles error response', () => {
      nock('http://www.youtube.com')
        .get('/get_video_info')
        .query({ video_id: 'x2o2mHY4-2I' })
        .reply(500);

      return expect(
        getCaptionInfo('x2o2mHY4-2I')
      ).to.be.rejectedWith(Error);
    });

  });

  describe('getCaptions', () => {
    afterEach(() => nock.cleanAll());

    it('captions available', () => {
      const captions = fs.readFileSync(
        './test/data/FxSmBbXSDl0_captions', 'utf8'
      );
      nock('http://www.youtube.com')
        .get('/api/timedtext')
        .query({ lang: 'en', v: 'FxSmBbXSDl0' })
        .reply(200, captions);

      return expect(
        getCaptions('FxSmBbXSDl0')
      ).to.eventually.equal(captions);
    });

    it('captions not available', () => {
      const captions = fs.readFileSync(
        './test/data/V7Er7PZqycM_captions', 'utf8'
      );
      nock('http://www.youtube.com')
        .get('/api/timedtext')
        .query({ lang: 'en', v: 'V7Er7PZqycM' })
        .reply(200, captions);

      return expect(
        getCaptions('V7Er7PZqycM')
      ).to.eventually.equal('');
    });

    it('handles error response', () => {
      nock('http://www.youtube.com')
        .get('/api/timedtext')
        .query({ lang: 'en', v: 'V7Er7PZqycM' })
        .reply(500);

      return expect(
        getCaptions('V7Er7PZqycM')
      ).to.be.rejectedWith(Error);
    });

  });

  describe('getAsr', () => {
    afterEach(() => nock.cleanAll());

    it('asr available', () => {
      const ttsurl = fs.readFileSync(
        './test/data/V7Er7PZqycM_ttsurl', 'utf8'
      );
      const [ , hostname, pathname ] = ttsurl.match(/(.*\.com)(.*)/);
      const asr = fs.readFileSync(
        './test/data/V7Er7PZqycM_asr', 'utf8'
      );
      nock(hostname)
        .get(`${pathname}&format=1`)
        .reply(200, asr);

      return expect(
        getAsr(ttsurl)
      ).to.eventually.eql(asr);
    });

    it('asr not available', () => {
      const ttsurl = fs.readFileSync(
        './test/data/FxSmBbXSDl0_ttsurl', 'utf8'
      );
      const [ , hostname, pathname ] = ttsurl.match(/(.*\.com)(.*)/);
      const asr = fs.readFileSync(
        './test/data/FxSmBbXSDl0_asr', 'utf8'
      );
      nock(hostname)
        .get(`${pathname}&format=1`)
        .reply(200, asr);

      return expect(
        getAsr(ttsurl)
      ).to.eventually.equal('');
    });

    it('handles error response', () => {
      const ttsurl = fs.readFileSync(
        './test/data/FxSmBbXSDl0_ttsurl', 'utf8'
      );
      const [ , hostname, pathname ] = ttsurl.match(/(.*\.com)(.*)/);
      nock(hostname)
        .get(`${pathname}&track=asr&kind=asr&asrs=1&lang=en`)
        .reply(500);

      return expect(
        getAsr(ttsurl)
      ).to.be.rejectedWith(Error);
    });

  });

  describe('convertCaptionsToJson', () => {

    it('decodes HTML/ascii codes', () => {
      const xml = fs.readFileSync(
        './test/data/FxSmBbXSDl0_captions', 'utf8'
      );
      const json = require('../data/FxSmBbXSDl0_captions.json');

      expect(
        convertCaptionsToJson(xml)
      ).to.eql(json);
    });

  });

});
