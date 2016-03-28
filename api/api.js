import { Router } from 'express';
import {
  getCaptionInfo,
  getCaptions,
  getAsr,
  convertCaptionsToJson
} from './youtube';

const APIRouter = () => {
  const api = Router();

  api.get('/captions/:id', (req, res) => {
    const id = req.params.id;

    getCaptionInfo(id)
      .then(ttsurl => {
        return Promise.all([ ttsurl, getCaptions(id) ]);
      })
      .then(([ ttsurl, captions ]) => {
        if (captions.length > 0) {
          res.json(convertCaptionsToJson(captions));
        } else {
          getAsr(ttsurl)
            .then(asr => {
              if (asr.length > 0) {
                res.json(convertCaptionsToJson(asr));
              } else {
                throw 'Failed to retrieve captions.';
              }
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
