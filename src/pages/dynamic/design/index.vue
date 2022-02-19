<template>
  <q-page class="row q-pa-sm">
    <q-scroll-area horizontal class="col-2 column">
      <div class="components-list q-pa-xs col column">
        <q-card class="col no-wrap q-pa-sm">
          <div v-for="(item, listIndex) in leftComponents" :key="listIndex">
            <div class="components-title">
              <q-icon :name="'img:icons/svg/component.svg'" size="xs" />
              {{ item.title }}
            </div>
            <draggable
              class="components-draggable"
              :list="item.list"
              :group="{ name: 'componentsGroup', pull: 'clone', put: false }"
              :clone="cloneComponent"
              draggable=".components-item"
              :sort="false"
              @end="onEnd"
            >
              <div
                v-for="(element, index) in item.list"
                :key="index"
                class="components-item"
                @click="addComponent(element)"
              >
                <div class="components-body">
                  <q-icon :name="'img:icons/svg/'+element.config.tagIcon+'.svg'" class="svg-icon" />
                  {{ element.config.label }}
                </div>
              </div>
            </draggable>
          </div>
        </q-card>
      </div>
    </q-scroll-area>
    <div class="col column q-pa-xs">
      <q-card class="col column">
        <draggable
          class="col row content-start drawing-board"
          :list="drawingList"
          :animation="340"
          :clone="cloneComponent"
          group="componentsGroup"
        >
          <draggable-item
            v-for="(item, index) in drawingList"
            :key="item.renderKey"
            :active-data="item"
            :index="index"
            :active-id="activeId"
            :form-data.sync="formData"
            :drawing-list="drawingList"
            :form-conf="formConf"
            @activeItem="activeFormItem"
            @copyItem="drawingItemCopy"
            @deleteItem="drawingItemDelete"
          />
        </draggable>
        <div
          v-show="!drawingList.length"
          class="absolute-center text-light-blue-4 text-h5"
        >从左侧拖入或点选组件进行表单设计</div>
      </q-card>
    </div>
    <div class="col-2 column">
      <setting-item :activeData="activeData" :formConf="formConf" :drawingList="drawingList" />
    </div>
    <code-drawer ref="codeDrawerDialog" />
  </q-page>
</template>

<script>
import draggable from 'vuedraggable';
// eslint-disable-next-line camelcase
import { js_beautify, css_beautify, html_beautify } from 'js-beautify';
import {
  commonComponents, advanceComponents, formConf, formData,
} from 'components/generator/config';
import codeDrawer from 'components/generator/codedrawer';
import { makeUpPreviewData, makeUpVueCode } from 'components/generator';

import {
  deepClone,
} from 'components/utils/index';
import settingItem from 'pages/dynamic/design/setting';
import draggableItem from 'pages/dynamic/design/draggableitem';

let tempActiveData;

export default {
  props: {
    formData: {
      type: Object,
      required: true,
    },
  },
  components: {
    draggable,
    settingItem,
    draggableItem,
    codeDrawer,
  },
  data() {
    return {
      formConf,
      activeId: null,
      activeData: null,
      drawingList: [],
      leftComponents: [
        {
          title: '常用控件',
          list: commonComponents,
        },
        {
          title: '高级控件',
          list: advanceComponents,
        },
      ],
      htmlCode: '',
      jsCode: '',
      cssCode: '',
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
  created() {
  },
  methods: {
    init() {
      this.drawingList = this.formData.drawingList;
      this.formConf = this.formData.formConf;
    },
    save() {
      this.assignFormData();
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
    execRun() {
      this.assignFormData();
      const type = 'form';
      const previewData = makeUpPreviewData(this.formData);
      this.previewData.template.value = previewData.htmlCode;
      this.previewData.js.value = previewData.jsCode;
      this.previewData.css.value = previewData.cssCode;
      this.previewData.formData = { formConf: { formModel: 'form' } };

      this.$refs.codeDrawerDialog.show(this.previewData);
    },
    assignFormData() {
      this.formData.drawingList = this.drawingList;
      this.formData.formConf = this.formConf;
    },
    empty() {
      this.formData = formData;
    },
    generateCode() {
      this.assignFormData();
      return makeUpVueCode(this.formData);
    },
    drawingItemCopy(item, parent) {
      let clone = deepClone(item);
      clone = this.createIdAndKey(clone);
      parent.push(clone);
      this.activeFormItem(clone);
    },
    drawingItemDelete(index, parent) {
      parent.splice(index, 1);
      this.$nextTick(() => {
        const len = this.drawingList.length;
        if (len) {
          this.activeFormItem(this.drawingList[len - 1]);
        }
      });
    },
    activeFormItem(currentItem) {
      this.activeData = currentItem;
      this.activeId = currentItem.config.formId;
    },
    onEnd(obj) {
      if (obj.from !== obj.to) {
        this.activeData = tempActiveData;
        this.activeId = this.formData.idGlobal;
      }
    },
    addComponent(item) {
      const clone = this.cloneComponent(item);
      this.drawingList.push(clone);
      this.activeFormItem(clone);
    },
    cloneComponent(origin) {
      const clone = deepClone(origin);
      this.createIdAndKey(clone);
      if (clone.placeholder !== undefined) {
        clone.placeholder += clone.config.label;
      }
      tempActiveData = clone;
      return tempActiveData;
    },
    createIdAndKey(item) {
      const { config } = item;
      this.formData.idGlobal += 1;
      config.formId = this.formData.idGlobal;
      config.renderKey = `${config.formId}${+new Date()}`; // 改变renderKey后可以实现强制更新组件
      if (config.layout === 'colFormItem') {
        item.vModel = `field${this.formData.idGlobal}`;
      } else if (config.layout === 'rowFormItem' || config.layout === 'tableItem') {
        config.componentName = `row${this.formData.idGlobal}`;
        if (!Array.isArray(config.children)) {
          config.children = [];
        }
        delete config.label;
      }
      if (Array.isArray(config.children)) {
        config.children = config.children.map((childItem) => this.createIdAndKey(childItem));
      }
      return item;
    },
  },
  watch: {
  },
  beforeDestroy() {
    this.assignFormData();
  },
};
</script>

<style scoped lang="stylus"></style>
