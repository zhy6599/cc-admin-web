import Vue from 'vue';
import { Notify } from 'quasar';

const error = (msg) => Notify.create({
  message: msg,
  timeout: 5000,
  color: 'negative',
});
const info = (msg) => Notify.create({
  message: msg,
  color: 'positive',
});
const warn = (msg) => Notify.create({
  message: msg,
  color: 'warning',
});
const retMsg = (r) => {
  if (r.success) {
    info(r.message);
  } else {
    error(r.message);
  }
};
Vue.prototype.$info = info;
Vue.prototype.$warn = warn;
Vue.prototype.$error = error;
Vue.prototype.$retMsg = retMsg;
