import { Router } from 'express';
import redis from 'redis';
import {
  getCaptionInfo,
  getCaptions,
  getAsr,
  convertCaptionsToJson
} from './youtube';

const redisClient = redis.createClient({
  retry_strategy: opts => {
    if (opts.times_connected > 3) return undefined;
    return 100;
  },
  enable_offline_queue: false
});
redisClient.on('error', err => {
  console.log(`Redis Error: ${err}`);
});

const APIRouter = () => {
  const api = Router();

  api.get('/captions/:id', (req, res, next) => {
    const id = req.params.id;

    redisClient.get(id, (err, reply) => {
      if (err) {
        console.log(err);
        return next();
      }
      if (reply) {
        console.log(`cache hit ${id}`);
        res.json(JSON.parse(reply));
      } else {
        return next();
      }
    });
  }, (req, res) => {
    const id = req.params.id;

    getCaptionInfo(id)
      .then(ttsurl => {
        return Promise.all([ ttsurl, getCaptions(id) ]);
      })
      .then(([ ttsurl, captions ]) => {
        if (captions.length > 0) {
          const captionsJson = convertCaptionsToJson(captions);
          redisClient.set(id, JSON.stringify(captionsJson));
          res.json(captionsJson);
        } else {
          getAsr(ttsurl)
            .then(asr => {
              if (asr.length > 0) {
                const asrJson = convertCaptionsToJson(asr);
                redisClient.set(id, JSON.stringify(asrJson));
                res.json(asrJson);
              } else {
                throw 'Failed to retrieve captions.';
              }
            })
            .catch(err => {
              res.status(500).json({
                error: err
              });
            });
        }
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  });

  return api;
};

export default APIRouter;
