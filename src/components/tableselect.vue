<template>
  <q-dialog maximized v-model="showDialog" flat persistent ref="dialog" position="right">
    <div class="dialog_card column">
      <h5 class="view_title justify-between q-px-md">
        选择添加
        <q-btn dense outline round icon="clear" size="sm" v-close-popup />
      </h5>
      <q-scroll-area class="col">
        <div class="dialog_form q-pa-md">
          <q-table
            flat
            color="primary"
            class="cross_table"
            separator="cell"
            :columns="columns"
            :data="list"
            row-key="id"
            :pagination.sync="pagination"
            :visible-columns="group"
            @request="query"
            :rows-per-page-options="[10,20,50,100]"
            :loading="loading"
            selection="multiple"
            :selected.sync="selected"
          >
            <template #top-left>
              <div class="row no-wrap">
                <div class="row items-center">
                  <q-input
                    outlined
                    dense
                    placeholder="请输入关键字搜索"
                    class="on-left"
                    clearable
                    @input="query"
                    debounce="500"
                    v-model="key"
                  ></q-input>
                </div>
              </div>
            </template>
          </q-table>
        </div>
      </q-scroll-area>
      <div class="row justify-end q-pa-md">
        <q-btn outline color="primary" label="取消" v-close-popup />
        <q-btn unelevated color="primary" class="on-right" label="保存" @click="saveSelect" />
      </div>
    </div>
  </q-dialog>
</template>

<script>
import { IndexMixin } from 'boot/mixins';

export default {
  name: 'TableSelect',
  mixins: [IndexMixin],
  props: {
    columns: {
      type: Array,
      required: true,
    },
    url: {
      type: Object,
      required: true,
    },
    selectQueryParam: {
      type: Object,
      required: false,
      default: () => {},
    },
  },
  data() {
    return {
      showDialog: false,
    };
  },
  methods: {
    queryParam() {
      return this.selectQueryParam;
    },
    show() {
      this.query();
      this.selected = [];
      this.showDialog = true;
    },
    hide() {
      this.showDialog = false;
    },
    saveSelect() {
      this.$emit('saveSelect', this.selected);
    },
  },
  mounted() {
  },
};
</script>

<style lang="stylus"></style>
