<template>
  <div ref="chart" :style="chartStyle" />
</template>

<script>
import echarts from 'echarts';
import 'echarts/map/js/china.js';

require('echarts/lib/chart/map');
require('echarts/lib/chart/lines');
require('echarts/lib/component/geo');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/theme/macarons');

export default {
  name: 'customplane',
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
  components: {
  },
  data() {
    return {
      chart: null,
      loading: false,
      color: ['#a6c84c', '#ffa022', '#46bee9'],
      planePath: 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z',
    };
  },
  computed: {
  },
  methods: {
    handleResize() {
      if (this.chart) {
        this.chart.resize();
      }
    },
    registerMap() {
      this.$axios.get('/bi/map/queryById?id=6fc8eaa8-2be7-4f62-8c67-59d968c06b21').then(({ result }) => {
        echarts.registerMap('MP', result.json);
        this.makeOptions();
      }).finally(() => {
      });
    },
    makeOptions() {
      const points = [{
        name: '供应商A',
        value: [115.974519, 40.457009],
      }, {
        name: '供应商B',
        value: [116.143267, 39.749144],
      }, {
        name: 'BossSoft',
        value: [116.843177, 40.376834],
      }];
      const colors = ['#FF8C00', '#00acea', '#1DE9B6'];

      const option = {
        // backgroundColor: '#1b1b1b',
        color: ['#FF8C00', '#00acea', '#1DE9B6'],
        tooltip: {
          trigger: 'item',
          formatter: '{b}',
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          data: ['供应商A', '供应商B'],
          textStyle: {
            color: '#fff',
          },
        },
        visualMap: {
          type: 'continuous',
          seriesIndex: [2, 3],
          min: 0,
          max: 100,
          calculable: true,
          color: ['#ff3333', 'orange', 'yellow', 'lime', 'aqua'],
          textStyle: {
            color: '#fff',
          },
        },
        geo: {
          map: 'MP',
          show: false,
        },
        series: [{
          type: 'map',
          map: 'MP',
          aspectScale: 0.75,
          itemStyle: {
            borderColor: 'rgba(100,149,237,1)',
            borderWidth: 0.5,
            areaColor: 'rgba(0,0,0,0)',
          },
          label: {
            show: true,
            textStyle: {
              color: '#fff',
            },
            emphasis: {
              textStyle: {
                color: '#fff',
              },
            },
          },
          emphasis: {
            label: {
              show: false,
            },
            itemStyle: {
              areaColor: 'rgba(0,0,0,0)',
            },
          },

        }, {
          type: 'effectScatter',
          coordinateSystem: 'geo',
          showEffectOn: 'render',
          rippleEffect: {
            period: 5,
            scale: 5,
            brushType: 'fill',
          },
          hoverAnimation: true,
          label: {
            formatter: '{b}',
            position: 'right',
            offset: [15, 0],
            color: (param) => colors[param.dataIndex % colors.length],
            show: true,
          },
          itemStyle: {
            color: (param) => colors[param.dataIndex % colors.length],
            shadowBlur: 10,
            shadowColor: '#333',
            opacity: 0.75,
          },
          emphasis: {
            itemStyle: {
              opacity: 1, // 线条宽度
            },
          },
          data: points,
        }, {
          name: '供应商A',
          type: 'lines',
          zlevel: 2,
          symbol: ['none', 'arrow'],
          symbolSize: 7,
          effect: {
            show: true,
            period: 4,
            trailLength: 0.02,
            symbol: 'circle',
            symbolSize: 4,
            color: '#fff',
          },
          lineStyle: {
            width: 0.5, // 线条宽度
            opacity: 0.5, // 尾迹线条透明度
            curveness: 0.3, // 尾迹线条曲直度
            shadowBlur: 10,
          },
          emphasis: {
            lineStyle: {
              width: 2, // 线条宽度
            },
          },
          data: [{
            name: '供应商A->BossSoft',
            value: 40,
            coords: [
              [115.974519, 40.457009],
              [116.843177, 40.376834],
            ],
          }],
        }, {
          name: '供应商B',
          type: 'lines',
          zlevel: 2,
          symbol: ['none', 'arrow'],
          symbolSize: 7,
          effect: {
            show: true,
            period: 4,
            trailLength: 0.02,
            symbol: 'circle',
            symbolSize: 4,
            color: '#fff',
          },
          lineStyle: {
            width: 0.5, // 线条宽度
            opacity: 0.5, // 尾迹线条透明度
            curveness: 0.3, // 尾迹线条曲直度
            shadowBlur: 10,
          },
          emphasis: {
            lineStyle: {
              width: 2, // 线条宽度
            },
          },
          data: [{
            name: '供应商B->BossSoft',
            value: 80,
            coords: [
              [116.143267, 39.749144],
              [116.843177, 40.376834],
            ],
          }],
        }],
      };
      this.chart.clear();
      this.chart.setOption(option);
      setTimeout(() => {
        this.chart.resize();
      }, 100);
    },
    renderChart() {
      this.chart = echarts.init(this.$refs.chart, 'shine');
      this.registerMap();
    },
  },
  mounted() {
    this.renderChart();
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

<style lang="stylus"></style>
