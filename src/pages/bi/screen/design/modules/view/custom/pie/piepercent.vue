<template>
  <div ref="chart" :style="chartStyle"></div>
</template>

<script>
import echarts from 'echarts';

export default {
  name: 'piepercent',
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
      timer: null,
      angle: 0, // 角度，用来做简单的动画效果的
      value: 80,
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
    makeOptions(angle, value) {
      const thiz = this;
      const option = {
        // backgroundColor: '#000E1A',
        title: {
          text: `{a|${value}}{c|%}`,
          x: 'center',
          y: 'center',
          textStyle: {
            rich: {
              a: {
                fontSize: 48,
                color: '#29EEF3',
              },

              c: {
                fontSize: 20,
                color: '#ffffff',
                // padding: [5,0]
              },
            },
          },
        },

        series: [
          // 紫色
          {
            name: 'ring5',
            type: 'custom',
            coordinateSystem: 'none',
            renderItem(params, api) {
              return {
                type: 'arc',
                shape: {
                  cx: api.getWidth() / 2,
                  cy: api.getHeight() / 2,
                  r: Math.min(api.getWidth(), (api.getHeight()) / 2) * 0.6,
                  startAngle: ((0 + angle) * Math.PI) / 180,
                  endAngle: ((90 + angle) * Math.PI) / 180,
                },
                style: {
                  stroke: '#8383FA',
                  fill: 'transparent',
                  lineWidth: 1.5,
                },
                silent: true,
              };
            },
            data: [0],
          }, {
            name: 'ring5', // 紫点
            type: 'custom',
            coordinateSystem: 'none',
            renderItem(params, api) {
              const x0 = api.getWidth() / 2;
              const y0 = api.getHeight() / 2;
              const r = Math.min(api.getWidth(), (api.getHeight()) / 2) * 0.6;
              const point = thiz.getCirlPoint(x0, y0, r, (90 + angle));
              return {
                type: 'circle',
                shape: {
                  cx: point.x,
                  cy: point.y,
                  r: 4,
                },
                style: {
                  stroke: '#8450F9', // 绿
                  fill: '#8450F9',
                },
                silent: true,
              };
            },
            data: [0],
          },
          // 蓝色

          {
            name: 'ring5',
            type: 'custom',
            coordinateSystem: 'none',
            renderItem(params, api) {
              return {
                type: 'arc',
                shape: {
                  cx: api.getWidth() / 2,
                  cy: api.getHeight() / 2,
                  r: Math.min(api.getWidth(), (api.getHeight()) / 2) * 0.6,
                  startAngle: ((180 + angle) * Math.PI) / 180,
                  endAngle: ((270 + angle) * Math.PI) / 180,
                },
                style: {
                  stroke: '#4386FA',
                  fill: 'transparent',
                  lineWidth: 1.5,
                },
                silent: true,
              };
            },
            data: [0],
          },
          {
            name: 'ring5', // 蓝色
            type: 'custom',
            coordinateSystem: 'none',
            renderItem(params, api) {
              const x0 = api.getWidth() / 2;
              const y0 = api.getHeight() / 2;
              const r = Math.min(api.getWidth(), (api.getHeight()) / 2) * 0.6;
              const point = thiz.getCirlPoint(x0, y0, r, (180 + angle));
              return {
                type: 'circle',
                shape: {
                  cx: point.x,
                  cy: point.y,
                  r: 4,
                },
                style: {
                  stroke: '#4386FA', // 绿
                  fill: '#4386FA',
                },
                silent: true,
              };
            },
            data: [0],
          },

          {
            name: 'ring5',
            type: 'custom',
            coordinateSystem: 'none',
            renderItem(params, api) {
              return {
                type: 'arc',
                shape: {
                  cx: api.getWidth() / 2,
                  cy: api.getHeight() / 2,
                  r: Math.min(api.getWidth(), (api.getHeight()) / 2) * 0.65,
                  startAngle: ((270 + -angle) * Math.PI) / 180,
                  endAngle: ((40 + -angle) * Math.PI) / 180,
                },
                style: {
                  stroke: '#0CD3DB',
                  fill: 'transparent',
                  lineWidth: 1.5,
                },
                silent: true,
              };
            },
            data: [0],
          },
          // 橘色

          {
            name: 'ring5',
            type: 'custom',
            coordinateSystem: 'none',
            renderItem(params, api) {
              return {
                type: 'arc',
                shape: {
                  cx: api.getWidth() / 2,
                  cy: api.getHeight() / 2,
                  r: Math.min(api.getWidth(), (api.getHeight()) / 2) * 0.65,
                  startAngle: ((90 + -angle) * Math.PI) / 180,
                  endAngle: ((220 + -angle) * Math.PI) / 180,
                },
                style: {
                  stroke: '#FF8E89',
                  fill: 'transparent',
                  lineWidth: 1.5,
                },
                silent: true,
              };
            },
            data: [0],
          }, {
            name: 'ring5',
            type: 'custom',
            coordinateSystem: 'none',
            renderItem(params, api) {
              const x0 = api.getWidth() / 2;
              const y0 = api.getHeight() / 2;
              const r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.65;
              const point = thiz.getCirlPoint(x0, y0, r, (90 + -angle));
              return {
                type: 'circle',
                shape: {
                  cx: point.x,
                  cy: point.y,
                  r: 4,
                },
                style: {
                  stroke: '#FF8E89', // 粉
                  fill: '#FF8E89',
                },
                silent: true,
              };
            },
            data: [0],
          }, {
            name: 'ring5', // 绿点
            type: 'custom',
            coordinateSystem: 'none',
            renderItem(params, api) {
              const x0 = api.getWidth() / 2;
              const y0 = api.getHeight() / 2;
              const r = Math.min(api.getWidth(), (api.getHeight()) / 2) * 0.65;
              const point = thiz.getCirlPoint(x0, y0, r, (270 + -angle));
              return {
                type: 'circle',
                shape: {
                  cx: point.x,
                  cy: point.y,
                  r: 4,
                },
                style: {
                  stroke: '#0CD3DB', // 绿
                  fill: '#0CD3DB',
                },
                silent: true,
              };
            },
            data: [0],
          }, {
            name: '吃猪肉频率',
            type: 'pie',
            radius: ['52%', '40%'],
            silent: true,
            clockwise: true,
            startAngle: 90,
            z: 0,
            zlevel: 0,
            label: {
              normal: {
                position: 'center',

              },
            },
            data: [{
              value,
              name: '',
              itemStyle: {
                normal: {
                  color: { // 完成的圆环的颜色
                    colorStops: [{
                      offset: 0,
                      color: '#A098FC', // 0% 处的颜色
                    },
                    {
                      offset: 0.3,
                      color: '#4386FA', // 0% 处的颜色
                    },
                    {
                      offset: 0.6,
                      color: '#4FADFD', // 0% 处的颜色
                    },
                    {
                      offset: 0.8,
                      color: '#0CD3DB', // 100% 处的颜色
                    }, {
                      offset: 1,
                      color: '#646CF9', // 100% 处的颜色
                    },
                    ],
                  },
                },
              },
            },
            {
              value: 100 - value,
              name: '',
              label: {
                normal: {
                  show: false,
                },
              },
              itemStyle: {
                normal: {
                  color: '#173164',
                },
              },
            },
            ],
          },
          {
            name: '吃猪肉频率',
            type: 'pie',
            radius: ['32%', '35%'],
            silent: true,
            clockwise: true,
            startAngle: 270,
            z: 0,
            zlevel: 0,
            label: {
              normal: {
                position: 'center',

              },
            },
            data: [{
              value,
              name: '',
              itemStyle: {
                normal: {
                  color: { // 完成的圆环的颜色
                    colorStops: [{
                      offset: 0,
                      color: '#00EDF3', // 0% 处的颜色
                    }, {
                      offset: 1,
                      color: '#646CF9', // 100% 处的颜色
                    }],
                  },
                },
              },
            },
            {
              value: 100 - value,
              name: '',
              label: {
                normal: {
                  show: false,
                },
              },
              itemStyle: {
                normal: {
                  color: '#173164',
                },
              },
            },
            ],
          },

        ],
      };
      return option;
    },
    renderChart() {
      if (!this.chart) {
        this.chart = echarts.init(this.$refs.chart, this.config.theme);
      }
      const option = this.makeOptions(this.angle, this.value);
      this.chart.setOption(option);
      this.chart.resize();
      setTimeout(this.startTimer(), 0);
    },
    // 获取圆上面某点的坐标(x0,y0表示坐标，r半径，angle角度)
    getCirlPoint(x0, y0, r, angle) {
      const x1 = x0 + r * Math.cos((angle * Math.PI) / 180);
      const y1 = y0 + r * Math.sin((angle * Math.PI) / 180);
      return {
        x: x1,
        y: y1,
      };
    },
    startTimer() {
      this.timer = setInterval(this.doing, 100);
    },
    doing() {
      this.angle += 3;
      const option = this.makeOptions(this.angle, this.value);
      this.chart.setOption(option, true);
    },
  },
  beforeDestroy() {
    clearTimeout(this.timer);
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
