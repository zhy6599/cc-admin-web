<template>
  <div class="col q-ma-xs column">
    <q-card class="col column q-pa-xs no-wrap">
      <div class="text-subtitle1 text-center q-py-sm">图表设置</div>
      <q-separator class="q-mb-sm" />
      <div class="chart-sel-tabs full-width">
        <q-tabs dense v-model="config.type" class="text-grey" active-color="primary">
          <q-tab v-for="t in tabs" :key="t.name" :name="t.name" :icon="t.icon">
            <q-tooltip>{{t.label}}</q-tooltip>
          </q-tab>
        </q-tabs>
      </div>

      <div v-if="config.type==='custom'" class="text-body2 q-pt-sm">自定义option</div>
      <q-select
        v-if="config.type==='custom'"
        dense
        filled
        options-dense
        v-model="config.custom.mapId"
        prefix="地图设置："
        class="q-my-sm"
        :options="biMap"
        emit-value
        map-options
      />
      <q-input
        v-if="config.type==='custom'"
        dense
        filled
        v-model="config.custom.option"
        type="textarea"
        :debounce="999"
        class="q-my-sm"
      />

      <q-tabs
        v-if="config.type!=='custom'"
        v-model="chartSettingTab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
      >
        <q-tab name="data" label="数据" />
        <q-tab v-if="config.type !== 'table'" name="chartTab" label="图表" />
        <q-tab v-if="config.type === 'table'" name="tableTab" label="表格" />
      </q-tabs>
      <q-separator />
      <q-tab-panels
        v-if="config.type!=='custom'"
        class="chart-dim-set"
        v-model="chartSettingTab"
        animated
      >
        <q-tab-panel name="data">
          <chartdata :config.sync="config" />
        </q-tab-panel>
        <q-tab-panel name="chartTab">
          <chartstyle :config.sync="config" />
        </q-tab-panel>
        <q-tab-panel name="tableTab">
          <charttable :config.sync="config" />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>

<script>
import { chartTypes } from 'boot/datatype';

import chartdata from './chart/data';
import charttable from './chart/table';
import chartstyle from './chart/style';

export default {
  name: 'chartsetting',
  components: {
    chartdata,
    charttable,
    chartstyle,
  },
  data() {
    return {
      chartSettingTab: 'data',
      loading: false,
      themes: [],
      widget: {
        id: -1,
        config: '',
        description: '',
        name: '',
        publish: true,
        type: 1,
        viewId: null,
      },
      views: [],
      model: [],
      sortables: [],
      tabs: chartTypes,
      biMap: [
      ],
    };
  },
  props: {
    config: {
      type: Object,
      required: false,
    },
  },
  mounted() {
    this.initDict();
  },
  methods: {
    initDict() {
      this.$axios.get('/sys/dictItem/selectItemsByDefId?defId=biMap').then((r) => {
        this.biMap = r;
      });
    },
  },
  watch: {
    config: {
      deep: true,
      handler() {
      },
    },
    'config.type': {
      handler(n, o) {
        if (n !== o) {
          if (n === 'table' && this.chartSettingTab === 'chartTab') {
            this.chartSettingTab = 'tableTab';
          }
          if (n !== 'table' && this.chartSettingTab === 'tableTab') {
            this.chartSettingTab = 'chartTab';
          }
        }
      },
    },
  },
};
</script>

<style lang="stylus">
@import '~src/css/quasar.variables.styl';

.chart-dim-set {
  .q-tab-panel {
    padding: 6px;
  }
}

.chart-sel-tabs {
  background: #fff;
  border-left: 1px solid $ash;

  .q-tabs {
    border-bottom: 1px solid $ash;

    .q-tabs__content {
      flex-wrap: wrap;
    }

    .q-tab {
      padding: 0;
      min-height: 40px;
    }

    .q-tab__content {
      min-width: 50;
    }
  }
}

.dotted {
  border: 1px $ash dashed;
  min-height: 50px;
  margin: 0 0 9px 0;
  padding: 9px 4px;

  >div {
    color: #fff;
    font-size: 14px;
    margin: 0 0 9px 0;

    >span {
      padding: 0 9px;
    }

    &:last-child {
      margin: 0;
    }

    &.drag-ing {
      opacity: 0.4;
    }

    &.drag-no {
      line-height: 30px;
      text-align: center;
      color: $grey;
    }

    .q-field__native, .q-select__dropdown-icon {
      color: #fff;
    }
  }

  .w_l_val, .w_l_cat {
    color: $black;

    .q-checkbox {
      display: none;
    }
  }
}

.modelCat {
  .w_l_g_cat {
    background: $primary-light;
  }
}

.modelVal {
  .w_l_g_val {
    background: $positive-light;
  }
}

.w_l_g_theme {
  div {
    position: relative;
    border-radius: 99px;
    padding: 4px;
    margin: 4px;
    border: 2px #fff solid;
    transition: border-color 0.4s ease-in;

    &.v-choosing, &:hover {
      border-color: $primary;
    }
  }

  i {
    display: block;
    width: 45px;
    height: 45px;
    border: 9px solid;
    border-radius: 99px;
    cursor: pointer;
  }
}
</style>
