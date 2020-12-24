import Vue from 'vue';
import viewnav from 'components/viewnav';
import btndel from 'components/btndel';
import helpinfo from 'components/helpinfo';

Vue.component('viewNav', viewnav);
Vue.component('btnDel', btndel);
Vue.component('helpInfo', helpinfo);

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
