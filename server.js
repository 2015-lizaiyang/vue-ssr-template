const fs = require('fs');
const path = require('path');
const express = require('express');
const favicon = require('serve-favicon');
const { createBundleRenderer } = require('vue-server-renderer');

const PORT = process.env.PORT || 1432;
const resolve = file => path.resolve(__dirname, file);

const app = express();

app.use(favicon('./public/favicon.png'));
app.use('/public', express.static(resolve('./public'), 0));
app.use('/', express.static(resolve('./dist'), 0));

let renderer = createBundleRenderer(require('./dist/vue-ssr-server-bundle.json'), {
  clientManifest: require('./dist/vue-ssr-client-manifest.json'),
  template: fs.readFileSync(resolve('./index.html'), 'utf-8'),
  basedir: resolve('./dist'),
  runInNewContext: 'once',
});

app.get('*', async (req, res) => {
  console.log(req.url);
  const s = Date.now();
  try {
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

app.listen(PORT, () => {
  console.log(`> Listening at http://localhost:${PORT}\n`);
});
