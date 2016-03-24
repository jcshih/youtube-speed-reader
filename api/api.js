import { Router } from 'express';

const APIRouter = () => {
  const api = Router();

  api.get('/hello', (req, res) => {
    res.json({
      data: 'hello'
    });
  });

  return api;
};

export default APIRouter;
