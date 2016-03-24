import path from 'path';
import express from 'express';
import morgan from 'morgan';
import APIRouter from './api/api';

const app = express();

app.set('port', (process.env.PORT || 8000));

app.use(express.static(path.join(__dirname, '/dist')));
app.use(morgan('combined', {
  skip: (req, res) => req.url === '/favicon.ico'
}));

app.use('/api', APIRouter());

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(app.get('port'), (err) => {
  if (err) console.log(err);
  console.info('==> Listening on port %s.', app.get('port'));
});
