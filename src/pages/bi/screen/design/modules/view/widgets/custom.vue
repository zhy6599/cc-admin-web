<template>
  <div ref="chart"  :style="chartStyle">
    <q-img v-if='!config.custom.option'
    :style="imageStyle"
    src="/img/bi/empty-chart.png"
    />
  </div>
</template>

<script>
import echarts from 'echarts';

require('echarts/theme/shine');

export default {
  name: 'custom',
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
      chartData: {},
      data: [],
      loading: false,
      tableData: [],
      imageStyle: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      },
    };
  },
  computed: {
  },
  watch: {
    config: {
      deep: true,
      handler() {
        if (this.config.needResize) {
          this.config.needResize = false;
          this.handleResize();
        }
      },
    },
    'config.custom.mapId': {
      handler(n, o) {
        if (n !== o) {
          this.renderChart();
        }
      },
      deep: true,
    },
  },
  methods: {
    handleResize() {
      if (this.chart) {
        this.chart.resize();
      }
    },
    registerMap() {
      if (this.config.custom.mapId) {
        this.$axios.get(`/bi/map/queryById?id=${this.config.custom.mapId}`).then(({ result }) => {
          echarts.registerMap('MP', result.json);
          this.renderChart();
        }).finally(() => {
        });
      }
    },
    renderChart() {
      if (!this.chart) {
        this.chart = echarts.init(this.$refs.chart, this.config.theme);
      }
      this.chart.clear();
      if (this.config.custom.option) {
        const option = JSON.parse(this.config.custom.option);
        this.chart.setOption(option);
        setTimeout(() => {
          this.chart.resize();
        }, 100);
      }
    },
  },
  mounted() {
    if (this.config.custom.mapId) {
      this.registerMap();
    } else {
      this.renderChart();
    }
  },
};
</script>

<style lang="stylus">
</style>
