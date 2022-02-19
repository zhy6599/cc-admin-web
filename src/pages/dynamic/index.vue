<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="mdi-material-design" aria-label="Menu" />
        <q-toolbar-title shrink>应用设计</q-toolbar-title>
        <div class="q-ml-xl col row justify-center">
          <q-btn-toggle
            v-model="step"
            spread
            class="my-custom-toggle"
            no-caps
            unelevated
            color="primary"
            text-color="white"
            toggle-color="orange"
            toggle-text-color="white"
            :options="stepOptions"
            @input="changeStep"
          />
          <q-space />
          <div class="q-gutter-sm" v-show="step === 'grid'">
            <q-btn dense outline icon="search" label="查询设置" @click="searchSet" />
            <q-btn dense outline icon="mdi-view-list-outline" label="列表设置" @click="listSet" />
          </div>
          <div class="q-gutter-sm" v-show="step === 'flow'"></div>
          <div class="q-ml-md q-gutter-sm">
            <q-btn dense outline icon="mdi-fan" label="运行" @click="execRun" />
            <q-btn dense outline icon="mdi-eye-circle-outline" label="查看配置" @click="showJson" />
            <q-btn dense outline icon="mdi-laptop" label="功能预览" @click="view()" />
            <q-btn dense outline icon="clear" label="清空配置" @click="empty" />
            <q-btn dense outline icon="save" label="保存配置" @click="save" />
          </div>
        </div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <design-form ref="design" v-if="step === 'design'" :formData.sync="formData" />
      <grid-form ref="grid" v-if="step === 'grid'" :formData.sync="formData" />
      <flow-form ref="flow" v-if="step === 'flow'" :formData.sync="formData" />
      <report-form class="q-pa-sm" ref="report" v-if="step === 'report'" :formData.sync="formData" />
      <advance-form ref="advance" v-if="step === 'advance'" :formData.sync="formData" />
      <q-dialog
        v-model="codeDialog"
        persistent
        :maximized="true"
        transition-show="slide-up"
        transition-hide="slide-down"
      >
        <q-card class="text-white column dialog_card">
          <q-bar class="bg-primary">
            JSON格式配置信息
            <q-space />
            <q-btn dense flat icon="close" v-close-popup>
              <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
            </q-btn>
          </q-bar>
          <q-scroll-area class="col">
            <json-viewer :value="formData" :expand-depth="4" copyable sort></json-viewer>
          </q-scroll-area>
        </q-card>
      </q-dialog>
      <confirm ref="confirmSave" :msg="step === 'flow'?'确认保存流程？':'保存配置信息会清除表内所有数据，确认保存？'" :icon="'save'"
      @confirm="doSave()" />
    </q-page-container>
  </q-layout>
</template>

<script>
import JsonViewer from 'vue-json-viewer';
import { formData } from 'components/generator/config';
import designForm from 'pages/dynamic/design';
import gridForm from 'pages/dynamic/grid';
import flowForm from 'pages/dynamic/flow';
import reportForm from 'pages/dynamic/report';
import advanceForm from 'pages/dynamic/advance';
import confirm from 'components/confirm';

export default {
  name: 'Dynamic',
  components: {
    designForm,
    gridForm,
    flowForm,
    reportForm,
    advanceForm,
    JsonViewer,
    confirm,
  },
  data() {
    return {
      step: 'design',
      stepOptions: [
        { label: '1.表单设计', value: 'design' },
        { label: '2.列表设置', value: 'grid' },
        { label: '3.工作流程', value: 'flow' },
        { label: '4.报表设计', value: 'report' },
      ],
      dynForm: null,
      formData,
      codeDialog: false,
    };
  },
  mounted() {
    this.$q.loading.show();
    this.$axios.get(`/dyn/form/queryById?id=${this.$route.query.id}`).then(({ result }) => {
      this.dynForm = result;
      document.title = `[${this.dynForm.name}]-设计`;
      if (result.config) {
        try {
          this.formData = JSON.parse(result.config);
          this.changeStep(this.step);
        } catch (e) { this.$error('解析配置信息出错'); }
      }
    }).finally(() => {
      this.$q.loading.hide();
    });
  },
  methods: {
    execRun() {
      this.$refs[this.step].execRun();
    },
    save() {
      this.$refs.confirmSave.show();
    },
    doSave() {
      this.$refs[this.step].save();
    },
    changeStep(v) {
      this.$nextTick(() => { this.$refs[v].init(); });
    },
    searchSet() {
      this.$refs.grid.showSearchSet();
    },
    listSet() {
      this.$refs.grid.showListSet();
    },
    resetGrid() {
      this.$refs.grid.reset();
    },
    empty() {
      this.formData = formData;
      this.changeStep(this.step);
    },
    showJson() {
      this.codeDialog = true;
    },
    view() {
      const { href } = this.$router.resolve({
        path: `#/dyn/form/view?id=${this.$route.query.id}`,
      });
      window.open(href, '_blank');
    },

  },
};
</script>
