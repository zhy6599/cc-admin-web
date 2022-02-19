<template>
  <q-dialog v-model="showDialog" maximized flat persistent position="right">
    <q-form class="dialog_card column">
      <h5 class="view_title justify-between q-px-md">
        查询设置
        <q-btn dense outline round icon="clear" size="sm" v-close-popup />
      </h5>
      <div class="col column">
        <div class="col q-pa-md">
          <search-item :allColumns="allColumns" v-for="(search,index) in searchColumns" :key="index"
          :item="search" @deleteItem="deleteItem(search)"/>
        </div>
      </div>
      <div class="row justify-end q-pa-md">
        <q-btn unelevated color="primary" class="on-right" label="添加查询" @click="add" />
        <q-btn unelevated color="primary" class="on-right" label="重置设置" @click="reset" />
        <q-space />
        <q-btn outline color="primary" label="关闭" v-close-popup />
        <q-btn unelevated color="primary" class="on-right" label="保存" @click="save" />
      </div>
    </q-form>
  </q-dialog>
</template>

<script>
import searchItem from 'pages/dynamic/grid/widgets/searchitem';
import {
  buildSearchList,
} from 'components/generator/index';

export default {
  name: 'SearchSet',
  props: {
    formData: {
      type: Object,
      required: true,
    },
  },
  components: { searchItem },
  data() {
    return {
      index: 0,
      searchColumns: [],
      allColumns: [],
      showDialog: false,
    };
  },
  methods: {
    init() {
      buildSearchList(this.formData);
      this.searchColumns = this.formData.grid.searchColumns;
      this.allColumns = this.formData.grid.allColumns;
      this.showDialog = true;
    },
    add() {
      let maxIndex = 0;
      this.searchColumns.forEach((column) => {
        if (column.index > maxIndex) maxIndex = column.index;
      });
      this.searchColumns.push({
        index: maxIndex + 1,
        vModel: '',
        label: '',
        opt: 'eq',
        defaultValue: '',
        group: 1,
      });
    },
    deleteItem(column) {
      const index = this.searchColumns.findIndex((c) => c.index === column.index);
      this.searchColumns.splice(index, 1);
    },
    save() {
      this.$emit('changeConfig');
      this.showDialog = false;
    },
    reset() {
      this.formData.grid.searchColumns = null;
      this.init();
    },
  },
  mounted() {
  },
};
</script>
<style>
</style>
