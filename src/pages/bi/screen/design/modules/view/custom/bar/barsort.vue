<template>
  <div ref="chart"  :style="chartStyle">
  </div>
</template>

<script>
import echarts from 'echarts';

export default {
  name: 'customcar',
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
      const myColor = ['#eb2100', '#eb3600', '#d0570e', '#d0a00e', '#34da62', '#00e9db', '#00c0e9', '#0096f3', '#33CCFF', '#33FFCC'];
      const option = {
        // backgroundColor: '#0e2147',
        grid: {
          left: '11%',
          top: '12%',
          right: '0%',
          bottom: '8%',
          containLabel: true,
        },
        xAxis: [{
          show: false,
        }],
        yAxis: [{
          axisTick: 'none',
          axisLine: 'none',
          offset: '27',
          axisLabel: {
            textStyle: {
              color: '#ffffff',
              fontSize: '16',
            },
          },
          data: ['南昌转运中心', '广州转运中心', '杭州转运中心', '宁夏转运中心', '兰州转运中心', '南宁转运中心', '长沙转运中心', '武汉转运中心', '合肥转运中心', '贵州转运中心'],
        }, {
          axisTick: 'none',
          axisLine: 'none',
          axisLabel: {
            textStyle: {
              color: '#ffffff',
              fontSize: '16',
            },
          },
          data: ['10', '9', '8', '7', '6', '5', '4', '3', '2', '1'],
        }, {
          name: '分拨延误TOP 10',
          nameGap: '50',
          nameTextStyle: {
            color: '#ffffff',
            fontSize: '16',
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(0,0,0,0)',
            },
          },
          data: [],
        }],
        series: [{
          name: '条',
          type: 'bar',
          yAxisIndex: 0,
          data: [4, 13, 25, 29, 38, 44, 50, 52, 60, 72],
          label: {
            normal: {
              show: true,
              position: 'right',
              textStyle: {
                color: '#ffffff',
                fontSize: '16',
              },
            },
          },
          barWidth: 12,
          itemStyle: {
            normal: {
              color(params) {
                const num = myColor.length;
                return myColor[params.dataIndex % num];
              },
            },
          },
          z: 2,
        }, {
          name: '白框',
          type: 'bar',
          yAxisIndex: 1,
          barGap: '-100%',
          data: [99, 99.5, 99.5, 99.5, 99.5, 99.5, 99.5, 99.5, 99.5, 99.5],
          barWidth: 20,
          itemStyle: {
            normal: {
              color: '#0e2147',
              barBorderRadius: 5,
            },
          },
          z: 1,
        }, {
          name: '外框',
          type: 'bar',
          yAxisIndex: 2,
          barGap: '-100%',
          data: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
          barWidth: 24,
          itemStyle: {
            normal: {
              color(params) {
                const num = myColor.length;
                return myColor[params.dataIndex % num];
              },
              barBorderRadius: 5,
            },
          },
          z: 0,
        },
        {
          name: '外圆',
          type: 'scatter',
          hoverAnimation: false,
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          yAxisIndex: 2,
          symbolSize: 35,
          itemStyle: {
            normal: {
              color(params) {
                const num = myColor.length;
                return myColor[params.dataIndex % num];
              },
              opacity: 1,
            },
          },
          z: 2,
        },
        ],
      };
      return option;
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
