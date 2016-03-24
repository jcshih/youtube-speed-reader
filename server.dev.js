import express from 'express';
import morgan from 'morgan';
import path from 'path';
import webpack from 'webpack';
import config from './webpack.config.dev';
import APIRouter from './api/api';

const compiler = webpack(config);
const app = express();

const middleware = require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath,
  contentBase: 'src',
  stats: {
    colors: true,
    timings: true
  }
});

app.use(morgan('dev', {
  skip: (req, res) => req.url === '/favicon.ico'
}));
app.use(middleware);
app.use(require('webpack-hot-middleware')(compiler, {
  log: console.log
}));

app.use('/api', APIRouter());

app.get('*', (req, res) => {
  res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
  res.end();
});
app.use(express.static(path.join(__dirname, '/dist')));

app.listen(8000, 'localhost', (err) => {
  if (err) console.log(err);
  console.info('==> Listening on port 8000.');
});
