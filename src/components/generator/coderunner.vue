<script>
import forEach from 'lodash/forEach';
import has from 'lodash/has';
import { runFnInVm } from 'components/utils/vm';

export default {
  name: 'CodeRunner',
  props: {
    template: Object,
    js: Object,
    css: Object,
  },
  data() {
    return {
      subCompErr: null,
    };
  },
  computed: {
    className() {
      // 生成唯一class，主要用于做scoped的样式
      const uid = Math.random().toString(36).slice(2);
      return `code-runner-${uid}`;
    },
    scopedStyle() {
      if (this.css.value) {
        const scope = `.${this.className}`;
        const regex = /(^|\})\s*([^{]+)/g;
        // 为class加前缀，做类似scope的效果
        return this.css.value.trim().replace(regex, (m, g1, g2) => (g1 ? `${g1} ${scope} ${g2}` : `${scope} ${g2}`));
      }
      return '';
    },
    component() {
      const exportDefault = 'export default ';
      const js = (this.js.value || '').trim().replace(exportDefault, '');
      const result = runFnInVm(`function generate() {return ${js}}`, {});
      const component = result.value;
      if (result.error) {
        result.error = {
          msg: result.error.toString(),
          type: 'js脚本错误',
        };
        result.value = { hasError: true };
        return result;
      }

      // 如果需要注入一些变量，则对被注入的字段进行检测
      // 防止用户代码中定义了此字段，导致冲突
      const resultTmp = this.checkVariableField(component);
      if (resultTmp) {
        return resultTmp;
      }

      const template = (this.template.value || '')
        .replace(/^ *< *template *>|<\/ *template *> *$/g, '')
        .trim();

      // 注入template或render，设定template优先级高于render
      if (template) {
        component.template = template;
        component.render = undefined;
      } else if (!component.render) {
        component.template = '<span>未提供模板或render函数</span>';
      }

      // 注入mixins
      component.mixins = [{
        beforeUpdate: () => {
          this.subCompErr = null;
        },
      }];

      // 通过computed注入一些变量，比如store中的一些字段，
      // 当store中的变量发生变化时，也会引发组件重绘
      const computed = component.computed || {};
      computed.variable = function variable() {
        const map = {};
        forEach(this.$store.state.variable.map, (value, key) => {
          map[key] = value;
        });
        return map;
      };
      component.computed = computed;

      return result;
    },
  },
  watch: {
    js() {
      this.subCompErr = null;
    },
    template() {
      this.subCompErr = null;
    },
    css() {
      this.subCompErr = null;
    },
  },
  methods: {
    checkVariableField(component) {
      // 如果需要注入一些变量，比如名字叫variable
      let { data } = component;
      let error = null;
      if (typeof data === 'function') {
        try {
          data = data();
        } catch (e) {
          console.log('渲染data出错', e);
          error = e;
        }
      }
      if (has(component, 'computed.variable')
        || has(data, 'variable')
      ) {
        return {
          error: {
            type: '功能限制',
            msg: '禁止自定义名称是variable的computed或data，会影响系统变量的使用',
          },
          value: { hasError: true },
        };
      }
      return error;
    },
  },
  render() {
    const { error: compileErr, value: component } = this.component;
    const error = compileErr || this.subCompErr;
    let errorDom;
    if (error) {
      errorDom = <div class='error-msg-wrapper text-red q-ma-xl'>
        <div>{error.type}</div>
        <div>{error.msg}</div>
      </div>;
    }
    return <div>
        <style>{this.scopedStyle}</style>
        {errorDom}
        <component />
    </div>;
  },
  mounted() {
  },
  errorCaptured(err) {
    this.subCompErr = {
      msg: err && err.toString && err.toString(),
      type: '自定义组件运行时错误：',
    };
  },
};
</script>
