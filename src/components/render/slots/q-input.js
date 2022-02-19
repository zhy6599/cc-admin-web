export default {
  prepend(h, conf, key) {
    return <template slot="prepend">{conf.slot[key]}</template>;
  },
  append(h, conf, key) {
    return <template slot="append">{conf.slot[key]}</template>;
  },
};
