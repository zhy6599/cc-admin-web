import Vue from 'vue';
import { Notify } from 'quasar';

const error = (msg, html) => Notify.create({
  message: msg,
  timeout: 5000,
  html: !!html,
  color: 'negative',
});
const info = (msg, html) => Notify.create({
  message: msg,
  html: !!html,
  color: 'positive',
});
const warn = (msg, html) => Notify.create({
  message: msg,
  html: !!html,
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
