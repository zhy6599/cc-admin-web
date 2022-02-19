export default {
  options(h, conf) {
    const list = [];
    conf.slot.options.forEach(() => {
      list.push(<div></div>);
    });
    return list;
  },
};
