const fs = require('fs');
const path = require('path');
const express = require('express');
const favicon = require('serve-favicon');
const setupDevServer = require('./build/setup-dev-server');

// const resolve = file => path.resolve(__dirname, file);

const app = express();

app.use(favicon('./public/favicon.png'));
// app.use('/dist', express.static(resolve('')))

setupDevServer(app);

app.get('*', (req, res) => {
  console.log(req.url);
  res.status(200).send(req.url);
});

app.listen(721, console.log);
