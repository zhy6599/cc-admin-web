<template>
  <q-dialog v-model="codeDrawer" persistent :maximized="true" transition-show>
    <q-form class="dialog_tool column">
      <h5 class="view_title justify-between q-px-md">
        页面预览
        <q-btn dense outline round icon="clear" size="sm" v-close-popup />
      </h5>
      <div class="col column">
        <div class="col row">
          <div class="col bg-white" v-if="showCode">
            <q-card>
              <q-tabs
                v-model="activeTab"
                dense
                class="text-grey"
                active-color="primary"
                indicator-color="primary"
                align="left"
              >
                <q-tab name="template" label="html" />
                <q-tab name="js" label="js" />
                <q-tab name="css" label="css" />
              </q-tabs>

              <q-separator />
              <q-tab-panels v-model="activeTab">
                <q-tab-panel style="height: 90vh;"
                v-for="item in previewData" :key="item.key" :name="item.key">
                  <code-editor :item="item" :mode="item.mode" />
                </q-tab-panel>
              </q-tab-panels>
            </q-card>
          </div>
          <div class="col column bg-white">
            <div class="q-mb-sm bg-light-blue-1">
              <q-toggle label="显示代码" v-model="showCode" />
              <q-btn color="primary" flat icon="mdi-refresh" label="刷新" @click="runCode" />
              <q-btn color="primary" flat icon="mdi-download" label="导出vue文件" @click="exportFile" />
              <q-btn color="primary" flat icon="mdi-content-copy" label="复制代码" @click="copyCode" />
            </div>
            <code-runner v-bind="previewData" />
          </div>
        </div>
      </div>
    </q-form>
  </q-dialog>
</template>
<script>
import { copyToClipboard } from 'quasar';
import { saveAs } from 'file-saver';
import codeRunner from 'components/generator/coderunner';
import codeEditor from 'components/generator/codeeditor';
import { vueTemplate, vueScript, cssStyle } from 'components/generator/html';

export default {
  components: { codeRunner, codeEditor },
  data() {
    return {
      activeTab: 'template',
      showCode: true,
      codeDrawer: false,
      showPreview: false,
      previewData: {},
    };
  },
  computed: {
  },
  watch: {},
  created() {
  },
  mounted() {
    window.addEventListener('keydown', this.preventDefaultSave);
  },
  methods: {
    preventDefaultSave(e) {
      if (e.key === 's' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
      }
    },
    copyCode() {
      copyToClipboard(this.generateCode())
        .then(() => {
          this.$info('代码已复制到剪切板，可粘贴。');
        })
        .catch(() => {
          this.$error('代码复制失败');
        });
    },
    show(previewData) {
      this.previewData = previewData;
      this.codeDrawer = true;
    },
    close() {
      this.codeDrawer = false;
    },
    runCode() {
    },
    generateCode() {
      const html = vueTemplate(this.previewData.template.value);
      const script = vueScript(this.previewData.js.value);
      const css = cssStyle(this.previewData.css.value);
      return `${html}\n${script}\n${css}`;
    },
    exportFile() {
      const value = `${+new Date()}.vue`;
      const codeStr = this.generateCode();
      const blob = new Blob([codeStr], { type: 'text/plain;charset=utf-8' });
      saveAs(blob, value);
    },
  },
};
</script>
