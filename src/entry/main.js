import Vue from 'vue';
import App from '../App';

export default context => ({
  app: new Vue({
    render: h => h(App),
  }),
});
