const fs = require('fs');
const path = require('path');
const express = require('express');
const lru = require('lru-cache');
const favicon = require('serve-favicon');
const { createBundleRenderer } = require('vue-server-renderer');

const PORT = process.env.PORT || 1432;
const resolve = file => path.resolve(__dirname, file);

const app = express();

const serve = (path1, cache) =>
  express.static(resolve(path1), {
    maxAge: cache && 1000 * 60 * 60 * 24 * 30,
  });

app.use(favicon('./public/favicon.png'));
app.use('/public', serve('./public', true));
app.use('/', serve('./dist', true));

const renderer = createBundleRenderer(
  require('./dist/vue-ssr-server-bundle.json'),
  {
    clientManifest: require('./dist/vue-ssr-client-manifest.json'),
    template: fs.readFileSync(resolve('./index.html'), 'utf-8'),
    basedir: resolve('./dist'),
    runInNewContext: 'once',
    cache: lru({
      max: 1000,
      maxAge: 1000 * 60 * 15,
    }),
  },
);

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
