import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import BottomNav from '@/components/BottomNav.vue';
import Layout from '@/components/Layout.vue';
import Icon from '@/components/Icon.vue';
import tagListModel from '@/models/tagListModel';

Vue.config.productionTip = false;
Vue.component('BottomNav', BottomNav);
Vue.component('Layout', Layout);
Vue.component('Icon', Icon);

window.tagList = tagListModel.fetch();
window.createTag = (name) => {
  const message = tagListModel.create(name);
  if (message !== 'duplicated') {
    if (message === 'null') {
      window.alert('标签名不能为空');
    }
  } else {
    window.alert('标签名重复');
  }
};
window.removeTag = (id) => {
  const message = window.confirm(`确定要删除标签吗`);
  return message && tagListModel.remove(id);
};
window.updateTag = (id, name) => {
  return tagListModel.update(id, name);
};
window.findTag = (id) => {
  return window.tagList.filter(item => item.id === id)[0];
};
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
