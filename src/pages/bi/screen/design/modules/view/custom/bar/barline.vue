<template>
  <div ref="chart"  :style="chartStyle">
  </div>
</template>

<script>
import echarts from 'echarts';

export default {
  name: 'barline',
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
      // import echarts from 'echarts'
      const charts = { // 按顺序排列从大到小
        cityList: ['38号点（1）', '38号点（2）', '15号点', '16号点', '24号点'],
        cityData: [7500, 6200, 5700, 4200, 3500],
      };
      const top10CityList = charts.cityList;
      const top10CityData = charts.cityData;
      const color = ['rgba(248,195,248', 'rgba(100,255,249', 'rgba(135,183,255', 'rgba(248,195,248', 'rgba(100,255,249'];

      const lineY = [];
      for (let i = 0; i < charts.cityList.length; i += 1) {
        let x = i;
        if (x > color.length - 1) {
          x = color.length - 1;
        }
        const data = {
          name: charts.cityList[i],
          color: `${color[x]})`,
          value: top10CityData[i],
          itemStyle: {
            normal: {
              show: true,
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: `${color[x]}, 0.3)`,
              }, {
                offset: 1,
                color: `${color[x]}, 1)`,
              }], false),
              barBorderRadius: 10,
            },
            emphasis: {
              shadowBlur: 15,
              shadowColor: 'rgba(0, 0, 0, 0.1)',
            },
          },
        };
        lineY.push(data);
      }

      return {
        // backgroundColor: '#000',
        title: {
          show: false,
        },
        tooltip: {
          trigger: 'item',
        },
        grid: {
          borderWidth: 0,
          top: '10%',
          left: '5%',
          right: '15%',
          bottom: '3%',
        },
        color,
        yAxis: [{
          type: 'category',
          inverse: true,
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisLabel: {
            show: false,
            inside: false,
          },
          data: top10CityList,
        }, {
          type: 'category',
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: true,
            inside: false,
            textStyle: {
              color: '#b3ccf8',
              fontSize: '14',
              fontFamily: 'PingFangSC-Regular',
            },
            formatter(val) {
              return `${val}k`;
            },
          },
          splitArea: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          data: top10CityData,
        }],
        xAxis: {
          type: 'value',
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
        },
        series: [{
          name: '',
          type: 'bar',
          zlevel: 2,
          barWidth: '10px',
          data: lineY,
          animationDuration: 1500,
          label: {
            normal: {
              color: '#b3ccf8',
              show: true,
              position: [0, '-24px'],
              textStyle: {
                fontSize: 16,
              },
              formatter(a) {
                return a.name;
              },
            },
          },
        }],
        animationEasing: 'cubicOut',
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
