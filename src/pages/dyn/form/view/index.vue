<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <coderunner v-if="showPreview" v-bind="previewData" />
    </q-page-container>
  </q-layout>
</template>

<script>
import coderunner from 'components/generator/coderunner';
import {
  makeUpPreviewData, makeUpVueCode, makeUpGridTemplate, makeUpGridScript, makeUpGridStyle,
} from 'components/generator';

export default {
  components: { coderunner },
  props: {},
  data() {
    return {
      showCode: true,
      activeTab: 'template',
      html: '',
      js: '',
      css: '',
      showPreview: false,
      formData: {},
      previewData: {
        template: {
          key: 'template',
          tab: '模板',
          value: '',
          mode: 'text/x-vue',
        },
        js: {
          key: 'js',
          tab: '代码',
          value: '',
          mode: 'text/javascript',
        },
        css: {
          key: 'css',
          tab: '样式',
          value: '',
          mode: 'text/css',
        },
      },
    };
  },
  watch: {},
  computed: {},
  methods: {
    init(config) {
      const template = makeUpGridTemplate(config);
      const script = makeUpGridScript(config);
      const style = makeUpGridStyle(config);
      this.previewData.template.value = template;
      this.previewData.js.value = script;
      this.previewData.css.value = style;
      this.previewData.formData = { formConf: { formModel: 'form' } };
      this.showPreview = true;
    },
    loadCode() {
      this.$q.loading.show();
      this.$axios.get(`/dyn/form/queryById?id=${this.$route.query.id}`).then(({ result }) => {
        this.dynForm = result;
        if (result.config) {
          try {
            const config = JSON.parse(result.config);
            this.init(config);
          } catch (e) { this.$error('解析配置信息出错'); }
        }
      }).finally(() => {
        this.$q.loading.hide();
      });
    },
  },
  mounted() {
    this.loadCode();
  },
};
</script>
<style lang="stylus"></style>
