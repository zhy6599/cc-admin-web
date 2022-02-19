<template>
  <q-page class="cc-admin row">
    <viewcatalog
      class="q-mt-sm q-mb-sm q-ml-sm"
      type="BiFavorites"
      @select="selectCatalog"
      v-if="this.$q.screen.gt.md"
    />
    <div class="col bg-white shadow-2 q-pa-md q-ma-sm">
      <div class="row items-center justify-start q-mb-md">
        <q-item class="col-xl-6 col-md-6 col-sm-6 col-xs-12">
          <q-item-section class="col-3 text-right gt-sm">
            <q-item-label>名称：</q-item-label>
          </q-item-section>
          <q-item-section class="col">
            <q-input outlined dense v-model="searchForm.name" type="text" class="col"
              @input="query"
              debounce="500" />
          </q-item-section>
        </q-item>
        <q-item v-show="showQuery" class="col-xl-6 col-md-6 col-sm-6 col-xs-12">
          <q-item-section class="col-3 text-right gt-sm">
            <q-item-label>类型：</q-item-label>
          </q-item-section>
          <q-item-section class="col">
            <q-select
              outlined
              dense
              emit-value
              v-model="searchForm.type"
              map-options
              :options="chartTypes"
              class="col"
              @input="query"
              debounce="500"
            />
          </q-item-section>
        </q-item>
      </div>
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
      >
        <template #body-cell-type="props">
          <q-td key="type" :props="props">{{getDictLabel(chartTypes,props.row.type) }}</q-td>
        </template>
        <template #body-cell-opt="props">
          <q-td :props="props" :auto-width="true">
            <q-btn flat round dense color="primary" icon="mdi-gnome" @click="addFav(props.row)">
              <q-tooltip>添加</q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
import { chartList } from 'boot/datatype';
import { IndexMixin } from 'boot/mixins';
import { getDictLabel } from 'boot/dictionary';
import viewcatalog from 'components/viewcatalog';

export default {
  name: 'BiFavorites',
  mixins: [IndexMixin],
  components: {
    viewcatalog,
  },
  data() {
    return {
      chartList,
      columns: [
        {
          name: 'name', align: 'left', label: '名称', field: 'name',
        },
        {
          name: 'type', align: 'left', label: '类型', field: 'type',
        },
        {
          name: 'opt', align: 'center', label: '操作', field: 'opt',
        },
      ],
      headers: [{ name: 'Authorization', value: localStorage.Authorization }],
      uploadUrl: `${process.env.SERVER_URL}${process.env.BASE_URL}/sys/common/upload`,
      imgUrl: `${process.env.SERVER_URL}${process.env.BASE_URL}/sys/common/static`,
      url: {
        list: '/bi/favorites/list',
        add: '/bi/favorites/add',
        edit: '/bi/favorites/edit',
        delete: '/bi/favorites/delete',
        deleteBatch: '/bi/favorites/deleteBatch',
        exportXlsUrl: '/bi/favorites/exportXls',
        importExcelUrl: '/bi/favorites/importExcel',
      },
    };
  },
  methods: {
    addFav(p) {
      this.$emit('addFavorite', p);
    },
    selectCatalog(n) {
      this.catalog = n;
      this.query();
    },
    getDictLabel,
    initDict() {
    },
  },
  computed: {
    chartTypes() {
      const types = [];
      this.chartList.forEach(((chart) => {
        types.push({ value: chart.type, label: chart.name });
      }));
      types.push({ value: 'complex', label: '多个组件' });

      return types;
    },
  },
  mounted() {
    this.initDict();
  },
};
</script>

<style lang="stylus"></style>
