<template>
  <div ref="chart"  :style="chartStyle">
  </div>
</template>

<script>
import echarts from 'echarts';

export default {
  name: 'piegroup',
  props: {
    config: {
      required: true,
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
  data() {
    return {
      chart: null,
    };
  },
  created() {

  },
  mounted() {
    this.renderChart();
  },
  methods: {
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
    makeOptions() {
      const equipment = ['华为', '中兴', '爱立信', '索尼', '联想', '思科'];
      const project = ['华为', '中兴', '烽火', '阿尔卡特', '三星', 'tplink', '惠普', '戴尔'];
      const colorList = ['#0090ff', '#06d3c4', '#ffbc32', '#2ccc44', '#ff3976', '#6173d6', '#914ce5', '#42b1cc', '#ff55ac', '#0090ff', '#06d3c4', '#ffbc32', '#2ccc44', '#ff3976', '#6173d6', '#914ce5', '#42b1cc', '#ff55ac', '#0090ff', '#06d3c4', '#ffbc32', '#2ccc44', '#ff3976', '#6173d6', '#914ce5', '#42b1cc', '#ff55ac', '#0090ff', '#06d3c4', '#ffbc32', '#2ccc44', '#ff3976', '#6173d6', '#914ce5', '#42b1cc', '#ff55ac', '#0090ff', '#06d3c4', '#ffbc32', '#2ccc44', '#ff3976', '#6173d6', '#914ce5', '#42b1cc', '#ff55ac', '#0090ff', '#06d3c4', '#ffbc32', '#2ccc44', '#ff3976', '#6173d6', '#914ce5', '#42b1cc', '#ff55ac', '#0090ff', '#06d3c4', '#ffbc32', '#2ccc44', '#ff3976', '#6173d6', '#914ce5', '#42b1cc', '#ff55ac', '#0090ff', '#06d3c4', '#ffbc32', '#2ccc44', '#ff3976', '#6173d6', '#914ce5', '#42b1cc', '#ff55ac', '#0090ff', '#06d3c4', '#ffbc32', '#2ccc44', '#ff3976', '#6173d6', '#914ce5', '#42b1cc', '#ff55ac', '#0090ff', '#06d3c4', '#ffbc32', '#2ccc44', '#ff3976', '#6173d6', '#914ce5', '#42b1cc', '#ff55ac', '#0090ff', '#06d3c4', '#ffbc32', '#2ccc44', '#ff3976', '#6173d6', '#914ce5', '#42b1cc', '#ff55ac'];
      return {
        // backgroundColor: '#fff',
        tooltip: {
          formatter(param) {
            if (param.data.type == null) {
              return `${param.data.name}:${param.value}个`;
            }

            return `${param.data.type}:${param.value}个`;
          },
        },

        series: [{
          name: '整体分类',
          type: 'pie',
          radius: [0, '30%'],
          label: {
            position: 'inner',

          },
          itemStyle: {
            normal: {
              borderColor: '#fff',
              borderWidth: 2,
              color(params) {
                return colorList[params.dataIndex];
              },
            },
          },

          selectedMode: 'single',
          data: [{
            value: 875,
            name: '传输',

          },
          {
            value: 1239,
            name: '话务',

          },
          ],
        },
        {
          name: '招标方式',
          type: 'pie',
          radius: ['40%', '55%'],

          itemStyle: {
            normal: {
              color(params) {
                return colorList[params.dataIndex];
              },
            },
          },
          label: {
            normal: {
              formatter(params) {
                if (params.value !== 0) return `${params.data.type}:${params.value}个`;
                return '';
              },
              show: true,

            },

          },

          data: [{
            value: 135,
            name: '传输',
            type: equipment[0],

          },
          {
            value: 200,
            name: '传输',
            type: equipment[1],

          },
          {
            value: 100,
            name: '传输',
            type: equipment[2],

          },
          {
            value: 50,
            name: '传输',
            type: equipment[3],

          },
          {
            value: 300,
            name: '传输',
            type: equipment[4],

          },
          {
            value: 90,
            name: '传输',
            type: equipment[5],

          },
          {
            value: 310,
            name: '话务',
            type: project[0],

          },
          {
            value: 234,
            name: '话务',
            type: project[1],

          },
          {
            value: 35,
            name: '话务',
            type: project[2],

          },
          {
            value: 100,
            name: '话务',
            type: project[3],

          },
          {
            value: 40,
            name: '话务',
            type: project[4],

          },
          {
            value: 400,
            name: '话务',
            type: project[5],

          },
          {
            value: 100,
            name: '话务',
            type: project[6],

          },
          {
            value: 20,
            name: '话务',
            type: project[7],

          },

          ],
        },
        ],
      };
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
      },
    },
  },
};
</script>

<style scoped lang="stylus">

</style>
