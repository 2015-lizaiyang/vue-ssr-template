const fs = require('fs');
const path = require('path');
const express = require('express');
const favicon = require('serve-favicon');
const { createBundleRenderer } = require('vue-server-renderer');
const setupDevServer = require('./build/setup-dev-server');

const PORT = process.env.PORT || 1432;
const resolve = file => path.resolve(__dirname, file);

const app = express();

app.use(favicon('./public/favicon.png'));
app.use('/public', express.static(resolve('./public'), 0));

let renderer;
const readyPromise = setupDevServer(app, (bundle, options) => {
  renderer = createBundleRenderer(bundle, {
    ...options,
    template: fs.readFileSync(resolve('./index.html'), 'utf-8'),
    basedir: resolve('./dist'), // todo
    runInNewContext: 'once',
  });
}).then(() => {
  app.listen(PORT, () => {
    console.log(`> Listening at http://localhost:${PORT}\n`);
  });
});

app.get('*', async (req, res) => {
  console.log(req.url);
  const s = Date.now();
  try {
    await readyPromise;
    // todo
    const context = {
      title: 'Just SSR',
      url: req.url,
    };
    const html = await renderer.renderToString(context);
    res.send(html);
    console.log(`whole request: ${Date.now() - s}ms\n`);
  } catch (err) {
    console.error(err);
    res.end('500 | Internal Server Error');
  }
});
