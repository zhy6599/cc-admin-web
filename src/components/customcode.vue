<script>

export default {
  name: 'CustomCode',
  props: {
    template: String, // template模板
    js: Object, // js逻辑
    css: String, // css样式
  },
  computed: {
    className() {
      // 生成唯一class，主要用于做scoped的样式
      const uid = Math.random().toString(36).slice(2);
      return `custom-code-${uid}`;
    },
    scopedStyle() {
      if (this.css) {
        const scope = `.${this.className}`;
        const regex = /(^|\})\s*([^{]+)/g;
        // 为class加前缀，做类似scope的效果
        return this.css.trim().replace(regex, (m, g1, g2) => (g1 ? `${g1} ${scope} ${g2}` : `${scope} ${g2}`));
      }
      return '';
    },
    component() {
      const component = this.js;
      // 去掉template的前后标签
      const template = this.template || ''
        .replace(/^ *< *template *>|<\/ *template *> *$/g, '')
        .trim();
      // 注入template或render，设定template优先级高于render
      if (template) {
        component.template = template;
        component.render = undefined;
      } else if (!component.render) {
        component.render = '<div>未提供模板或render函数</div>';
      }
      return component;
    },
  },
  render() {
    const { component } = this;
    return <div class={this.className}>
      <style>{this.scopedStyle}</style>
      <component />
    </div>;
  },
};
</script>
