<template>
  <q-dialog v-model="showDialog" maximized flat persistent position="right">
    <q-form class="dialog_card column">
      <h5 class="view_title justify-between q-px-md">
        列表设置
        <q-btn dense outline round icon="clear" size="sm" v-close-popup />
      </h5>
      <div class="col column">
        <div class="col q-pa-md">
          <div class="row q-gutter-sm items-center" v-for="(column,index) in columns" :key="index">
            <div class="col">
              <q-input dense outlined type="text" class="q-my-sm" v-model="column.label" readonly />
            </div>
            <div>
              <q-btn dense round text-color="red" icon="delete" @click="deleteColumn(column)" />
            </div>
          </div>
        </div>
      </div>
      <div class="row justify-end q-pa-md">
        <q-btn unelevated color="primary" class="on-right" label="重置设置" @click="reset" />
        <q-space />
        <q-btn outline color="primary" label="关闭" v-close-popup />
        <q-btn unelevated color="primary" class="on-right" label="保存" @click="save" />
      </div>
    </q-form>
  </q-dialog>
</template>

<script>
import { buildColumnList } from 'components/generator';

export default {
  name: 'SearchSet',
  props: {
    formData: {
      type: Object,
      required: true,
    },
  },
  components: {},
  data() {
    return {
      showDialog: false,
      columns: [],
      group: [],
      drawingList: [],
      formConf: {},
    };
  },
  methods: {
    init() {
      this.drawingList = this.formData.drawingList;
      if (!this.formData.grid.columns) {
        // 初始化列信息
        buildColumnList(this.formData);
      }
      this.columns = this.formData.grid.columns;
      this.group = this.formData.grid.group;
      this.showDialog = true;
    },
    deleteColumn(column) {
      this.columns.splice(this.columns.findIndex((item) => item.name === column.name), 1);
    },
    save() {
      this.$emit('changeConfig');
      this.showDialog = false;
    },
    reset() {
      this.formData.grid.columns = null;
      this.formData.grid.group = null;
      this.init();
    },
  },
  mounted() {

  },
  watch: {
  },
};
</script>
<style>
</style>
