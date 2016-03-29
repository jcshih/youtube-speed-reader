import fetch from 'isomorphic-fetch';
import _ from 'lodash';
import { toJson } from 'xml2json';

const GET_VIDEO_INFO_URL = 'http://www.youtube.com/get_video_info?video_id=';
const GET_CAPTIONS_URL = 'http://www.youtube.com/api/timedtext?lang=en&v=';

const checkStatus = (res) => {
  if (res.status >= 200 && res.status < 400) {
    return res;
  } else {
    const error = new Error(res.statusText);
    error.response = res;
    throw error;
  }
};

const getCaptionInfo = (id) => {
  return fetch(`${GET_VIDEO_INFO_URL}${id}`)
    .then(checkStatus)
    .then(res => res.text())
    .then(text => {
      const params = text.split('&');
      const captionTracks = params.find(param =>
        param.startsWith('caption_tracks')
      );

      if (captionTracks) {
        return captionTracks;
      } else {
        throw 'No captions available.';
      }
    })
    .then(ttsurl => {
      const params = decodeURIComponent(ttsurl.split('=')[1]).split('&');
      const u = params.find(param => param.startsWith('u='));
      return decodeURIComponent(u.split('=')[1]);
    })
    .catch(err => {
      throw err;
    });
};

const getCaptions = (id) => {
  return fetch(`${GET_CAPTIONS_URL}${id}`)
    .then(checkStatus)
    .then(res => res.text())
    .then(captions => captions)
    .catch(err => {
      throw err;
    });
};

const getAsr = (ttsurl) => {
  return fetch(`${ttsurl}&format=1`)
    .then(checkStatus)
    .then(res => res.text())
    .then(asr => asr)
    .catch(err => {
      throw err;
    });
};

const convertCaptionsToJson = (xml) => {
  const captions = toJson(xml, { object: true, sanitize: false });
  return _.update(captions, 'transcript.text', text => {
    return _.map(text, caption => ({
      ...caption,
      start: Number(caption.start),
      dur: Number(caption.dur),
      $t: decode(caption['$t'])
    }));
  });
};

const decode = (str) => {
  return str.replace(/\&\#(\d+)\;/g, (match, code) => {
    return String.fromCharCode(Number(code));
  }).replace(/(\&[a-z]{1,4}\;)/g, (match, code) => {
    return {
      '&lt;'   : '<',
      '&gt;'   : '>',
      '&#40;'  : '(',
      '&#41;'  : ')',
      '&#35;'  : '#',
      '&amp;'  : '&',
      '&quot;' : '"',
      '&apos;' : "'"
    }[code] || code;
  });
};

export {
  getCaptionInfo,
  getCaptions,
  getAsr,
  convertCaptionsToJson
};
