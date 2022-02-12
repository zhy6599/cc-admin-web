import Vue from 'vue';
import viewnav from 'components/viewnav';
import btndel from 'components/btndel';
import helpinfo from 'components/helpinfo';

import inputTime from 'components/form/inputtime';
import inputDate from 'components/form/inputdate';
import inputDatetime from 'components/form/inputdatetime';
import inputTimerange from 'components/form/inputtimerange';

Vue.component('viewNav', viewnav);
Vue.component('btnDel', btndel);
Vue.component('helpInfo', helpinfo);

Vue.component('inputTime', inputTime);
Vue.component('inputDate', inputDate);
Vue.component('inputDateTime', inputDatetime);
Vue.component('inputTimeRange', inputTimerange);

Vue.directive('auth', (el, { value }, vnode) => {
  if (!vnode.context.$store.getters['Rule/confirmAuth'](value)) {
    const comment = document.createComment(' ');
    vnode.elm = comment;
    vnode.isComment = true;

    if (el.parentNode) {
      el.parentNode.replaceChild(comment, el);
    }
  }
});

Vue.directive('choosing', (el, { expression, value }) => {
  if (value || expression === undefined) {
    el.classList.add('v-choosing');
  } else {
    el.classList.remove('v-choosing');
  }
});
