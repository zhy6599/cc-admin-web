import Vue from 'vue';

Vue.filter('NumberFormat', (value) => {
  if (!value) {
    return '0';
  }
  const intPartFormat = value.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'); // 将整数部分逢三一断
  return intPartFormat;
});

/** 字符串超长截取省略号显示 */
Vue.filter('ellipsis', (value, vlength = 25) => {
  if (!value) {
    return '';
  }
  if (value.length > vlength) {
    return `${value.slice(0, vlength)}...`;
  }
  return value;
});
