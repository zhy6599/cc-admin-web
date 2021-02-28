<template>
  <div ref="chart"  :style="chartStyle">
  </div>
</template>

<script>
import echarts from 'echarts';

require('echarts-liquidfill');

export default {
  name: 'piethree',
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
      return {
        title: {
          text: '水球图',
        },
        // backgroundColor: '#151934',
        series: [{
          type: 'liquidFill',
          radius: '20%',
          color: ['#195ba6'],
          center: ['25%', '50%'],
          data: [0.4544, 0.4544, 0.4544, 0.4544, 0.4544],
          backgroundStyle: {
            borderWidth: 2,
            borderColor: '#1789fb',
            color: '#1c233f',
          },
          outline: {
            itemStyle: {
              borderWidth: 5,
              borderColor: '#1789fb',
              borderType: 'dashed',
            },
          },
          label: {
            normal: { // 此处没有生效，本地生效
              textStyle: {
                fontSize: 20,
                color: '#e6e6e6',
              },
            },
          },
        },
        {

          type: 'liquidFill',
          radius: '20%',
          color: ['#884046'],
          center: ['50%', '50%'],
          data: [0.6, 0.6, 0.6, 0.6, 0.6],
          backgroundStyle: {
            borderWidth: 2,
            borderColor: '#eb5c4d',
            color: '#1c233f',
          },
          outline: {
            itemStyle: {
              borderWidth: 5,
              borderColor: '#eb5c4d',
              borderType: 'dashed',
            },
          },
          label: {
            normal: { // 同上
              textStyle: {
                fontSize: 20,
                color: '#e6e6e6',
              },
            },
          },

        },
        {

          type: 'liquidFill',
          radius: '20%',
          color: ['#8a7e4e'],
          center: ['75%', '50%'],
          data: [1, 1, 1, 1, 1],
          backgroundStyle: {
            borderWidth: 2,
            borderColor: '#f0d25c',
            color: '#1c233f',
          },
          outline: {
            itemStyle: {
              borderWidth: 5,
              borderColor: '#f0d25c',
              borderType: 'dashed',
            },
          },
          label: {
            normal: { // 同上
              textStyle: {
                fontSize: 20,
                color: '#e6e6e6',
              },
            },
          },

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
