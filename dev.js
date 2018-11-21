const fs = require('fs');
const path = require('path');
const express = require('express');
const favicon = require('serve-favicon');
const { createBundleRenderer } = require('vue-server-renderer');
const setupDevServer = require('./build/setup-dev-server');

const PORT = process.env.PORT || 7210;
const resolve = file => path.resolve(__dirname, file);

const app = express();

app.use(favicon('./public/favicon.png'));
// todo
// app.use('/dist', express.static(resolve('./dist'), 0));
// app.use('/cache', express.static(resolve('./cache'), 0));
app.use('/public', express.static(resolve('./public'), 0));

let renderer;
const readyPromise = setupDevServer(app, (bundle, options) => {
  renderer = createBundleRenderer(bundle, {
    ...options,
    template: fs.readFileSync(resolve('./index.html'), 'utf-8'),
    basedir: resolve('./dist'), // todo
    runInNewContext: false,
  });
}).then(() => {
  app.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}`);
  });
});

app.get('*', async (req, res) => {
  console.log('\n', req.url);
  try {
    await readyPromise;
    // todo
    const context = {
      title: 'Just SSR',
      url: req.url,
    };
    const html = await renderer.renderToString(context);
    res.status(200).send(html);
  } catch (err) {
    console.log(err);
    res.end('error');
  }
});
