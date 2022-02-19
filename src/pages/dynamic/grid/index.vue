<template>
  <div>
    <coderunner v-if="showPreview" v-bind="previewData" />
    <searchSet ref="searchSetDialog" :formData.sync="formData" @changeConfig="init" />
    <listSet ref="listSetDialog"  :formData.sync="formData" @changeConfig="init" />
    <code-drawer ref="codeDrawerDialog" />
  </div>
</template>

<script>
import coderunner from 'components/generator/coderunner';
import {
  makeUpPreviewData, makeUpVueCode, makeUpGridTemplate, makeUpGridScript, makeUpGridStyle,
} from 'components/generator';
import codeDrawer from 'components/generator/codedrawer';
import searchSet from 'pages/dynamic/grid/search';
import listSet from 'pages/dynamic/grid/list';

export default {
  components: {
    coderunner, searchSet, listSet, codeDrawer,
  },
  props: {
    formData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showCode: true,
      showPreview: false,
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
    assignFormData() {
    },
    execRun() {
      this.$refs.codeDrawerDialog.show(this.previewData);
    },
    showSearchSet() {
      this.$refs.searchSetDialog.init();
    },
    showListSet() {
      this.$refs.listSetDialog.init();
    },
    init() {
      const config = this.formData;
      const template = makeUpGridTemplate(config);
      const script = makeUpGridScript(config);
      const style = makeUpGridStyle(config);
      this.previewData.template.value = template;
      this.previewData.js.value = script;
      this.previewData.css.value = style;
      this.previewData.formData = { formConf: { formModel: 'form' } };
      this.showPreview = true;
    },
    save() {
      this.$q.loading.show();
      this.$axios.put('/dyn/form/editConfig', {
        id: this.$route.query.id,
        config: JSON.stringify(this.formData),
      }).then((r) => {
        this.$q.notify(r.message);
      }).finally(() => {
        this.$q.loading.hide();
      });
    },
  },
  beforeDestroy() {
    this.assignFormData();
  },
  mounted() {
  },
};
</script>
<style lang="stylus"></style>
