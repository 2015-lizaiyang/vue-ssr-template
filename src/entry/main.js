import Vue from 'vue';
import Antd from 'ant-design-vue';
import App from '../App';

import 'ant-design-vue/dist/antd.css';

Vue.use(Antd);

export default context => ({
  app: new Vue({
    render: h => h(App),
  }),
});
