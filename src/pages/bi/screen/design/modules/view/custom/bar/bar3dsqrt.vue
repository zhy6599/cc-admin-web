<template>
  <div ref="chart" :style="chartStyle"></div>
</template>

<script>
import echarts from 'echarts';

export default {
  name: 'bar3dsqrt',
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
      const data = [{
        level: '6等',
        landArea: 120,
      },
      {
        level: '7等',
        landArea: 200,
      },
      {
        level: '8等',
        landArea: 230,
      },
      {
        level: '9等',
        landArea: 280,
      },
      {
        level: '10等',
        landArea: 300,
      },
      {
        level: '11等',
        landArea: 200,
      },
      {
        level: '12等',
        landArea: 130,
      },
      ];
      const CubeLeft = echarts.graphic.extendShape({
        shape: {
          x: 0,
          y: 0,
        },
        buildPath(ctx, shape) {
          const { xAxisPoint } = shape;
          const c0 = [shape.x, shape.y];
          const c1 = [shape.x - 20, shape.y - 4];
          const c2 = [xAxisPoint[0] - 20, xAxisPoint[1] - 4];
          const c3 = [xAxisPoint[0], xAxisPoint[1]];
          ctx.moveTo(c0[0], c0[1]).lineTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1])
            .closePath();
        },
      });
      const CubeRight = echarts.graphic.extendShape({
        shape: {
          x: 0,
          y: 0,
        },
        buildPath(ctx, shape) {
          const { xAxisPoint } = shape;
          const c1 = [shape.x, shape.y];
          const c2 = [xAxisPoint[0], xAxisPoint[1]];
          const c3 = [xAxisPoint[0] + 8, xAxisPoint[1] - 4];
          const c4 = [shape.x + 8, shape.y - 4];
          ctx.moveTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1])
            .closePath();
        },
      });
      const CubeTop = echarts.graphic.extendShape({
        shape: {
          x: 0,
          y: 0,
        },
        buildPath(ctx, shape) {
        // 逆时针 角 y 负数向上  X 负数向左
          const c1 = [shape.x, shape.y];
          const c2 = [shape.x + 8, shape.y - 4];
          const c3 = [shape.x - 11, shape.y - 8];
          const c4 = [shape.x - 20, shape.y - 4];
          ctx.moveTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1])
            .closePath();
        },
      });
      echarts.graphic.registerShape('CubeLeft', CubeLeft);
      echarts.graphic.registerShape('CubeRight', CubeRight);
      echarts.graphic.registerShape('CubeTop', CubeTop);
      const MAX = [];
      const VALUE = [];
      const LEV = [];
      const chartData = [].concat(data);
      chartData.forEach((item) => {
        VALUE.push(item.landArea);
        LEV.push(item.level);
      });
      const maxItem = [].concat(VALUE).sort((a, b) => b - a)[0];

      let SUM = 0;
      VALUE.forEach((item) => {
        SUM += item;
        MAX.push(maxItem);
      });
      const option = {
        // backgroundColor: 'rgba(0, 43, 77, 0.9)',
        tooltip: {
          trigger: 'item',
          confine: false,
          position: 'top',
          textStyle: {
            fontSize: 12,
          },
          // extraCssText: 'box-shadow: 0 0 20px #00C7FF inset',
          // backgroundColor: 'rgba(0,155,206,0.5)',
          backgroundColor: 'transparent',
          formatter(params) {
            const percentage = ((VALUE[params.dataIndex] / SUM) * 100).toFixed(2);
            return `<div class="tooltip">${VALUE[params.dataIndex]}万亩 ${percentage}%</div>`;
          },
          extraCssText: 'box-shadow: 0 0 20px #00C7FF inset;',
        },
        grid: {
          show: false,
          left: 0,
          right: 10,
          bottom: 150,
          top: 50,
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          data: LEV,
          axisLine: {
            show: true,
            lineStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [{
                offset: 0,
                color: '#D2A62E',
              }, {
                offset: 1,
                color: '#C62129',
              }]),
            },
          },
          offset: 10,
          axisTick: {
            show: false,
          },
          axisLabel: {
            fontSize: 12,
            color: '#00FFFE',
          },
        },
        yAxis: {
          show: false,
          type: 'value',
          axisLine: {
            show: true,
            lineStyle: {
              color: 'white',
            },
          },
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            fontSize: 12,
          },
          boundaryGap: ['20%', '20%'],
        },
        series: [{
          type: 'custom',
          renderItem(params, api) {
            const location = api.coord([api.value(0), api.value(1)]);
            return {
              type: 'group',
              children: [{
                type: 'CubeLeft',
                shape: {
                  api,
                  xValue: api.value(0),
                  yValue: api.value(1),
                  x: location[0],
                  y: location[1],
                  xAxisPoint: api.coord([api.value(0), 0]),
                },
                style: {
                  fill: 'rgba(1,17,33,.5)',
                },
              }, {
                type: 'CubeRight',
                shape: {
                  api,
                  xValue: api.value(0),
                  yValue: api.value(1),
                  x: location[0],
                  y: location[1],
                  xAxisPoint: api.coord([api.value(0), 0]),
                },
                style: {
                  fill: 'rgba(1,17,33,.5)',
                },
              }, {
                type: 'CubeTop',
                shape: {
                  api,
                  xValue: api.value(0),
                  yValue: api.value(1),
                  x: location[0],
                  y: location[1],
                  xAxisPoint: api.coord([api.value(0), 0]),
                },
                style: {
                  fill: 'rgba(1,17,33,.5)',
                },
              }],
            };
          },
          data: MAX,
        }, {
          type: 'custom',
          renderItem: (params, api) => {
            const location = api.coord([api.value(0), api.value(1)]);
            return {
              type: 'group',
              children: [{
                type: 'CubeLeft',
                shape: {
                  api,
                  xValue: api.value(0),
                  yValue: api.value(1),
                  x: location[0],
                  y: location[1],
                  xAxisPoint: api.coord([api.value(0), 0]),
                },
                style: {
                  fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#1477BD',
                  }, {
                    offset: 1,
                    color: '#00FFFE',
                  }]),
                },
              }, {
                type: 'CubeRight',
                shape: {
                  api,
                  xValue: api.value(0),
                  yValue: api.value(1),
                  x: location[0],
                  y: location[1],
                  xAxisPoint: api.coord([api.value(0), 0]),
                },
                style: {
                  fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#002E75', // 顶部
                  }, {
                    offset: 1,
                    color: '#00B0D0', // 底部
                  }]),
                },
              }, {
                type: 'CubeTop',
                shape: {
                  api,
                  xValue: api.value(0),
                  yValue: api.value(1),
                  x: location[0],
                  y: location[1],
                  xAxisPoint: api.coord([api.value(0), 0]),
                },
                style: {
                  fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#33F7FB',
                  }, {
                    offset: 1,
                    color: '#00FFFE',
                  }]),
                },
              }],
            };
          },
          data: VALUE,
        }, {
          type: 'bar',
          label: {
            normal: {
              show: false,
              position: 'top',
              formatter: (e) => {
                switch (e.name) {
                  case '6等':
                    return VALUE[0];
                  case '7等':
                    return VALUE[1];
                  case '8等':
                    return VALUE[2];
                  case '9等':
                    return VALUE[3];
                  case '10等':
                    return VALUE[4];
                  case '11等':
                    return VALUE[5];
                  case '12等':
                    return VALUE[6];
                  default:
                    return '';
                }
              },
              fontSize: 10,
              color: '#fff',
              offset: [0, -5],
            },
          },
          itemStyle: {
            color: 'transparent',
          },
          data: MAX,
        }],
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

<style scoped lang="stylus"></style>
