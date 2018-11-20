const fs = require('fs');
const path = require('path');
const express = require('express');
const favicon = require('serve-favicon');
const { createBundleRenderer } = require('vue-server-renderer');
const setupDevServer = require('./build/setup-dev-server');

const PORT = process.env.PORT || 721;
const resolve = file => path.resolve(__dirname, file);

const app = express();

app.use(favicon('./public/favicon.png'));
app.use('/dist', express.static(resolve('./dist'), 0));
app.use('/public', express.static(resolve('./public'), 0));

let renderer;
const readyPromise = setupDevServer(app, (bundle, options) => {
  renderer = createBundleRenderer(bundle, {
    ...options,
    template: fs.readFileSync(resolve('./index.html')),
    basedir: resolve('./dist'),
    runInNewContext: false,
  });
  console.log('renderer1', !!renderer);
}).then(() => {
  app.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}`);
  });
});

app.get('*', (req, res) => {
  console.log(req.url);
  readyPromise
    .then(() => {
      const context = {
        title: 'Just SSR',
        url: req.url,
      };
      console.log('renderer2', !!renderer);
      renderer.renderToString(context, (err, html) => {
        console.log(html);
        if (err) throw err;
        res.status(200).send(html);
      });
    })
    .catch(err => {
      console.log(err);
      res.end();
    });
});
