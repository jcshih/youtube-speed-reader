import fetch from 'isomorphic-fetch';

const youtubeUrlRegex = /^.*(?:youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/;

const extractVideoId = (url) => {
  const promise = new Promise((resolve, reject) => {
    const match = youtubeUrlRegex.exec(url);
    if (match) {
      const videoId = match[1];
      resolve(videoId);
    } else {
      reject('Invalid YouTube URL.');
    }
  });

  return promise;
};

const delay = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(), 250);
  });
};

export { extractVideoId, delay };
