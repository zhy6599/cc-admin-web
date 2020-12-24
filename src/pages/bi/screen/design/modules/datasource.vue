<template>
  <div class="col q-ma-xs column">
    <q-card class="col column q-pa-xs no-wrap">
      <div class="text-subtitle1 text-center q-py-sm">数据源设置</div>
      <q-separator class="q-mb-sm" />
      <q-linear-progress stripe indeterminate v-if="loading" class="absolute-top" />
      <q-select
        dense
        emit-value
        map-options
        v-model="widget.viewId"
        :options="views"
        prefix="计算视图："
        @input="confirmGetModel"
      />
      <div class="text-body1 row items-center q-pa-sm">
        <q-icon name="graphic_eq" class="on-left" size="24px" />
        <span class="col">维度</span>
        <q-checkbox dense v-if="modelCat.length" v-model="allCat" />
      </div>
      <q-scroll-area class="col">
        <draggable
          class="w_l_list"
          v-model="modelCat"
          :sort="false"
          :group="{name:'modelCat',pull:'clone',put:false}"
          :clone="clone"
          @start="cloneStart($event,'modelCat')"
          @end="cloneEnd"
        >
          <div v-for="q in modelCat" :key="q.name" class="row items-center w_l_cat">
            <q-icon :name="q.icon" color="primary" class="on-left" size="24px" />
            <span class="col">{{q.name}}</span>
            <q-checkbox dense v-model="q.check" />
          </div>
        </draggable>
      </q-scroll-area>
      <div class="text-body1 row items-center q-pa-sm">
        <q-icon name="signal_cellular_alt" class="on-left" size="24px" />
        <span class="col">指标</span>
        <q-checkbox dense v-if="modelVal.length" v-model="allVal" color="positive" />
      </div>
      <q-scroll-area class="col">
        <draggable
          class="w_l_list"
          v-model="modelVal"
          :sort="false"
          :group="{name:'modelVal',pull:'clone',put:false}"
          :clone="clone"
          @start="cloneStart($event,'modelVal')"
          @end="cloneEnd"
        >
          <div v-for="q in modelVal" :key="q.name" class="row items-center w_l_val">
            <q-icon :name="q.icon" color="positive" class="on-left" size="24px" />
            <span class="col">{{q.name}}</span>
            <q-checkbox dense v-model="q.check" color="positive" />
          </div>
        </draggable>
      </q-scroll-area>
    </q-card>
  </div>
</template>

<script>

import { columnToIcon, calculateType, sortType } from 'boot/datatype';
import draggable from 'vuedraggable';

export default {
  name: 'datasource',
  components: {
    draggable,
  },
  data() {
    return {
      loading: false,
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
    };
  },
  props: {
    config: {
      type: Object,
      required: false,
    },
  },
  mounted() {
    this.getViews();
  },
  methods: {
    clone() {
      return {
        name: this.uid(),
        field: {
          alias: '',
        },
      };
    },
    sort(val) {
      return sortType.find((v) => v.value === val);
    },
    getViews() {
      return this.$axios.get('/bi/view/listAll')
        .then(({ result }) => {
          this.views = result.map((v) => ({
            label: v.name,
            value: v.id,
          }));
        });
    },
    confirmGetModel() {
      if ((this.config.cols && this.config.cols.length)
        || (this.config.rows && this.config.rows.length)) {
        this.$q.dialog({
          title: '切换视图',
          message: '切换视图将清空维度和指标列表，确认切换？',
          cancel: true,
          ok: {
            color: 'primary',
          },
        }).onOk(() => {
          Object.assign(this.config, {
            cols: [],
            rows: [],
            colors: [],
            orders: [],
            viewId: this.widget.viewId,
          });
          this.getModel();
        }).onCancel(() => {
          this.widget.viewId = this.config.viewId;
        });
      } else {
        this.config.viewId = this.widget.viewId;
        this.getModel();
      }
    },
    getModel() {
      this.loading = true;
      return this.$axios.get(`/bi/view/queryById?id=${this.config.viewId}`)
        .then(({ result }) => {
          this.model = Object.entries(JSON.parse(result.model)).map(([name, v]) => ({
            name,
            type: v.modelType,
            visualType: v.visualType,
            icon: columnToIcon(v.visualType),
            check: false,
          }));
        }).finally(() => {
          this.loading = false;
        });
    },
    uid() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16)
        + Math.floor((9 + Math.random()) * 0x10000).toString(16);
    },
    cloneStart(e, type) {
      const list = this[type];
      this.config.draging = {
        type,
        data: list.some((v) => v.check) ? list.filter((v) => v.check) : [list[e.oldIndex]],
      };
    },
    cloneEnd() {
      this.config.draging = {
        type: '',
        data: [],
      };
    },
  },
  computed: {
    modelCat() {
      return this.model.filter((v) => v.type === 'category');
    },
    modelVal() {
      return this.model.filter((v) => v.type === 'value');
    },
    calculateType() {
      return calculateType;
    },
    allCat: {
      get() {
        let b;
        if (this.modelCat.every((v) => v.check)) {
          b = true;
        }
        if (this.modelCat.every((v) => !v.check)) {
          b = false;
        }
        return b;
      },
      set(c) {
        this.modelCat.forEach((v) => {
          v.check = c;
        });
      },
    },
    allVal: {
      get() {
        let b;
        if (this.modelVal.every((v) => v.check)) {
          b = true;
        }
        if (this.modelVal.every((v) => !v.check)) {
          b = false;
        }
        return b;
      },
      set(c) {
        this.modelVal.forEach((v) => {
          v.check = c;
        });
      },
    },
  },
};
</script>

<style lang="stylus"></style>
