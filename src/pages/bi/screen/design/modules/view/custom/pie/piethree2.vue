<template>
  <div ref="chart"  :style="chartStyle">
  </div>
</template>

<script>
import echarts from 'echarts';

require('echarts-liquidfill');

export default {
  name: 'piethree2',
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
        // backgroundColor: 'rgba(52,55,77,1)',
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/> {b}: {c}',
          textStyle: {
            color: '#fff',
            fontStyle: 'normal',
            fontFamily: '微软雅黑',
            fontSize: 17,
          },
        },
        series: [
          {
          // silent: true,
            type: 'sunburst',
            name: '种类',
            radius: ['80%', '50%'],
            z: 2,
            data: [
              {
                name: '总甲',
                value: 500,
                children: [
                  {
                    name: '甲类',
                    value: 200,
                    children: [
                      {
                        name: '甲1类',
                        value: 100,
                      },
                    ],
                  },
                ],
              },
              {
                name: '总乙',
                value: 500,
                children: [
                  {
                    value: 500,
                    name: '乙类',
                    children: [{ name: '乙1类', value: 400 }],
                  },
                ],
              },
              {
                name: '总丙',
                value: 500,
                children: [
                  {
                    value: 400,
                    name: '丙类',
                    children: [
                      {
                        name: '丙1类',
                        value: 200,
                      },
                    ],
                  },
                ],
              },
            ],
            itemStyle: {
            // parent的图形样式，不会被后代继承
              borderWidth: 0,
              // borderColor: 'rgba(52,55,77,1)',
            },
            label: {
            // parent的图形样式，不会被后代继承
              show: false,
              formatter: ' {b} \n\n {c}',
            },
            levels: [
              {},
              {
                r0: '0',
                r: '40%',
                label: {
                  show: true,
                  rotate: 0,
                  fontSize: 16,
                  color: '#f1f1f1',
                },
                itemStyle: {
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 1,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: '#81C2FF', // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: '#3090EA', // 100% 处的颜色
                      },
                    ],
                    global: false, // 缺省为 false
                  },
                  borderWidth: 5,
                  // borderColor: 'rgba(52,55,77,1)',
                },
              },
              {
                r0: '52%',
                r: '58%',
                itemStyle: {
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 1,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: '#81C2FF', // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: '#3090EA', // 100% 处的颜色
                      },
                    ],
                    global: false, // 缺省为 false
                  },
                },
              },
              {
                r0: '60%',
                r: '70%',
                itemStyle: {
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 1,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: '#81C2FF', // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: '#3090EA', // 100% 处的颜色
                      },
                    ],
                    global: false, // 缺省为 false
                  },
                },
              },
            ],
          },
          {
            silent: true,
            type: 'sunburst',
            // radius: ["80%", "50%"],
            z: 1,
            data: [
              {
                name: '甲类',
                value: 500,
                children: [
                  {
                    value: 500,
                    name: '',
                    children: [
                      {
                        value: 500,
                      },
                    ],
                  },
                ],
              },
              {
                name: '乙类',
                value: 500,
                children: [
                  {
                    value: 500,
                    name: '',
                    children: [
                      {
                        value: 500,
                      },
                    ],
                  },
                ],
              },
              {
                name: '丙类',
                value: 500,
                children: [
                  {
                    value: 500,
                    name: '',
                    children: [
                      {
                        value: 500,
                      },
                    ],
                  },
                ],
              },
            ],
            itemStyle: {
            // parent的图形样式，不会被后代继承
              borderWidth: 5,
              // borderColor: 'rgba(52,55,77,1)',
            },
            label: {
            // parent的图形样式，不会被后代继承
              show: false,
            },
            levels: [
              {},
              {
                itemStyle: {
                  color: 'transparent',
                },
              },
              { r0: '52%', r: '59%', itemStyle: { color: '#33486C' } },
              {
                r0: '59%',
                r: '71%',
                itemStyle: {
                  color: '#33486C',
                },
              },
            ],
          },
          {
            name: '',
            silent: true,
            type: 'gauge',
            radius: '58%',
            center: ['50%', '50%'],
            z: 3,
            startAngle: 0,
            endAngle: 359.9,
            splitNumber: 24,
            hoverAnimation: true,
            axisTick: {
              show: false,
            },
            splitLine: {
              length: '26%',
              lineStyle: {
                width: 3,
                // color: 'rgba(52,55,77,1)',
              },
            },
            axisLabel: {
              show: false,
            },
            pointer: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                opacity: 0,
              },
            },
            detail: {
              show: false,
            },
            data: [
              {
                value: 0,
                name: '',
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
