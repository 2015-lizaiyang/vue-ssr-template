const Vue = require('vue');
const renderer = require('vue-server-renderer').createRenderer();

const app = new Vue({
  template: `<div>hello</div>`,
});

renderer.renderToString(app).then(html => {
  console.log(html);
});
