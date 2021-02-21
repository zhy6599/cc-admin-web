<template>
  <div ref="chart" :style="chartStyle"></div>
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
      const xData = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
      const lastYearData = [3, 20, 62, 34, 55, 65, 33];
      const thisYearData = [11, 38, 23, 39, 66, 66, 79];
      const timeLineData = [1];
      const legend = ['2017', '2018'];
      const background = '#0e2147'; // 背景
      const textColor = '#fff';
      const lineColor = 'rgba(255,255,255,0.2)';
      const colors = [{
        borderColor: 'rgba(227,161,96,1)',
        start: 'rgba(227,161,96,0.8)',
        end: 'rgba(227,161,96,0.3)',
      },
      {
        borderColor: 'rgba(0,222,255,1)',
        start: 'rgba(0,222,255,0.3)',
        end: 'rgba(0,222,255,0.8)',
      },
      ];
      let borderData = [];
      const scale = 2;
      borderData = xData.map(() => scale);
      const option = {
        baseOption: {
          backgroundColor: background,
          timeline: {
            show: false,
            top: 0,
            data: [],
          },
          legend: {
            top: '5%',
            right: '5%',
            itemWidth: 20,
            itemHeight: 5,
            // itemGap: 343,
            icon: 'horizontal',
            textStyle: {
              color: '#ffffff',
              fontSize: 20,
            },
            data: legend,
          },
          grid: [{
            show: false,
            left: '5%',
            top: '10%',
            bottom: '8%',
            containLabel: true,
            width: '37%',
          }, {
            show: false,
            left: '51%',
            top: '10%',
            bottom: '8%',
            width: '0%',
          }, {
            show: false,
            right: '2%',
            top: '10%',
            bottom: '8%',
            containLabel: true,
            width: '37%',
          }],
          xAxis: [{
            type: 'value',
            inverse: true,
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            position: 'top',
            axisLabel: {
              show: true,
              color: textColor,
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: lineColor,
              },
            },
          }, {
            gridIndex: 1,
            show: false,
          }, {
            gridIndex: 2,
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            position: 'top',
            axisLabel: {
              show: true,
              color: textColor,
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: lineColor,
              },
            },
          }],
          yAxis: [{
            type: 'category',
            inverse: true,
            position: 'right',
            axisLine: {
              show: true,
              lineStyle: {
                color: lineColor,
              },
            },

            axisTick: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            data: xData,
          }, {
            gridIndex: 1,
            type: 'category',
            inverse: true,
            position: 'left',
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: true,
              padding: [30, 0, 0, 0],
              textStyle: {
                color: '#ffffff',
                fontSize: 20,
              },
              align: 'center',

            },
            data: xData.map((value) => ({
              value,
              textStyle: {
                align: 'center',
              },
            })),
          }, {
            gridIndex: 2,
            type: 'category',
            inverse: true,
            position: 'left',
            axisLine: {
              show: true,
              lineStyle: {
                color: lineColor,
              },
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: false,

            },
            data: xData,
          }],
          series: [],

        },
        options: [],
      };

      option.baseOption.timeline.data.push(timeLineData[0]);
      option.options.push({
        series: [{
          name: '2017',
          type: 'bar',
          barWidth: 25,
          stack: '1',
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: colors[0].start,
              },
              {
                offset: 1,
                color: colors[0].end,
              },
              ]),
            },
          },
          label: {
            normal: {
              show: false,
            },
          },
          data: lastYearData,
          animationEasing: 'elasticOut',
        },
        {
          name: '2017',
          type: 'bar',
          barWidth: 25,
          stack: '1',
          itemStyle: {
            normal: {
              color: colors[0].borderColor,

            },
          },
          data: borderData,
        },
        {
          name: '2018',
          type: 'bar',
          stack: '2',
          barWidth: 25,
          xAxisIndex: 2,
          yAxisIndex: 2,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: colors[1].start,
              },
              {
                offset: 1,
                color: colors[1].end,
              },
              ]),
            },
          },
          label: {
            normal: {
              show: false,
            },
          },
          data: thisYearData,
          animationEasing: 'elasticOut',
        },
        {
          name: '2018',
          type: 'bar',
          xAxisIndex: 2,
          yAxisIndex: 2,
          barWidth: 25,
          stack: '2',
          itemStyle: {
            normal: {
              color: colors[1].borderColor,

            },
          },
          data: borderData,
        },
        ],
      });
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
