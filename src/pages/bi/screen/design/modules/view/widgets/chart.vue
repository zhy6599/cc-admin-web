<template>
  <div ref="chart"  :style="chartStyle"/>
</template>

<script>
import { debounce } from 'quasar';
import echarts from 'echarts';
import { makeOptions } from './optionsmaker';

require('echarts/theme/shine');
require('echarts-wordcloud');

export default {
  name: 'chart',
  props: {
    config: {
      required: true,
      default: () => {},
    },
    chartStyle: {
      require: false,
      type: Object,
      default: () => ({
        height: '100%',
        position: 'absolute',
        width: '100%',
        top: '0px',
        bottom: '0px',
        left: '0px',
      }),
    },
  },
  components: {
  },
  data() {
    return {
      chart: null,
      allParam: {},
      chartData: {},
      data: [],
      interval: this.config.interval,
      ti: 0,
      loading: false,
      tableData: [],
    };
  },
  computed: {
    orders() {
      return [
        ...this.config.cols.filter((t) => t.sort).map((t) => ({
          column: t.name,
          direction: t.sort,
        })),
        ...this.config.rows.filter((t) => t.sort).map((t) => ({
          column: `${t.agg}(${t.name.split('@')[0]})`,
          direction: t.sort,
        })),
      ];
    },
    loopHandler() {
      return this.config.loop && (this.config.interval - 0);
    },
  },
  watch: {
    config: {
      deep: true,
      handler() {
        if (this.config.needResize) {
          this.config.needResize = false;
          this.handleResize();
        }
        this.getData();
      },
    },
    'config.cols': {
      handler() {
        this.getData();
      },
      deep: true,
    },
    'config.rows': {
      handler() {
        this.getData();
      },
      deep: true,
    },
    'config.loop': {
      handler(n, o) {
        if (n !== o) {
          this.confirmLoop();
        }
      },
    },
    'config.interval': {
      handler(n, o) {
        if (n !== o) {
          this.confirmLoop();
        }
      },
    },
    'config.length': {
      handler(n, o) {
        if (n !== o) {
          this.format();
        }
      },
    },
  },
  methods: {
    makeOptions,
    format() {
      this.tableData = this.data
        .slice(0, this.config.slice ? this.config.length : this.data.length);
      this.chartData = this.tableData.map((v) => {
        const t = {};
        this.config.rows.forEach(({ name, agg }) => {
          if (agg) {
            t[name] = v[`${agg}(${name})`];
          } else {
            t[name] = v[`${name}`];
          }
        });
        t.label = this.config.cols
          .map(({ name, field: { alias } }) => (alias ? `${alias}:${v[name]}` : v[name]))
          .join('\n');
        return t;
      });
    },
    getOrders() {
      const orders = [];
      this.config.orders.forEach((o) => {
        orders.push({
          column: o.name,
          direction: o.sort,
        });
      });
      return orders;
    },
    doLoadData() {
      if (this.config.cols && this.config.cols.length > 0) {
        this.loading = true;
        this.$axios.post(`/bi/view/getChartData/${this.config.viewId}`, {
          type: this.config.type,
          aggregators: this.config.rows.map((v) => ({
            column: v.name.split('@')[0],
            func: v.agg,
            alias: v.field.alias,
            axisIndex: v.leftRight ? '1' : '0',
          })),
          allParam: this.allParam,
          cache: false,
          expired: 0,
          filters: this.config.filters,
          groups: this.config.cols,
          nativeQuery: false,
          orders: this.getOrders(),
          pageNo: 1,
          pageSize: this.config.length,
        }).then(({ result }) => {
          this.chartData = result || {};
          this.renderChart();
          this.format();
        }).finally(() => {
          this.loading = false;
          this.confirmLoop();
        });
      } else if (this.config.type === 'custom') {
        this.renderChart();
      }
    },
    loop() {
      clearTimeout(this.ti);
      this.interval -= 1;
      if (this.interval < 1) {
        this.getData();
      } else {
        this.ti = setTimeout(() => {
          this.loop();
        }, 999);
      }
    },
    confirmLoop() {
      if (this.loopHandler) {
        this.interval = this.config.interval - (-1);
        this.loop();
      } else {
        clearTimeout(this.ti);
      }
    },
    allParamChange(allParam) {
      this.allParam = allParam;
      this.getData();
    },
    handleResize() {
      if (this.chart) {
        this.chart.resize();
      }
    },
    renderChart() {
      if (!this.chart) {
        this.chart = echarts.init(this.$refs.chart, this.config.theme);
      }
      const option = this.makeOptions(this.config, this.chartData);
      this.chart.clear();
      this.chart.setOption(option);
      setTimeout(() => {
        this.chart.resize();
      }, 100);
    },
  },
  mounted() {
    this.doLoadData();
  },
  created() {
    // 这里监听所有请求参数
    this.$root.$on('allParamChange', this.allParamChange);
    this.getData = debounce(this.doLoadData, 500);
  },
  beforeDestroy() {
    clearTimeout(this.ti);
    this.$root.$off('allParamChange', this.allParamChange);
  },
};
</script>

<style lang="stylus">
</style>
