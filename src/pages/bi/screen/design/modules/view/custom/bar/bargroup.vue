<template>
  <div ref="chart"  :style="chartStyle">
  </div>
</template>

<script>
import echarts from 'echarts';

export default {
  name: 'bargroup',
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
      const nianchu = ['13.8', '6.2', '3.1', '8.2', '10.1', '2', '2', '2.5'];
      const qichu = ['11.3', '9.6', '4.3', '12.8', '3.3', '1', '5', '1.3'];
      const dangqian = ['6.1', '6', '2.5', '5.5', '10.9', '2', '2', '0.8'];

      const colors = [
        {
          type: 'linear',
          x: 0,
          x2: 1,
          y: 0,
          y2: 0,
          colorStops: [{
            offset: 0,
            color: '#FF7256',
          }, {
            offset: 0.5,
            color: '#FF7256',
          }, {
            offset: 0.5,
            color: '#FFC0CB',
          }, {
            offset: 1,
            color: '#FFC0CB',
          }],
        },
        {
          type: 'linear',
          x: 0,
          x2: 1,
          y: 0,
          y2: 0,
          colorStops: [{
            offset: 0,
            color: '#49dff0',
          }, {
            offset: 0.5,
            color: '#49dff0',
          }, {
            offset: 0.5,
            color: '#abe8ef',
          }, {
            offset: 1,
            color: '#abe8ef',
          }],
        },
        {

          type: 'linear',
          x: 0,
          x2: 1,
          y: 0,
          y2: 0,
          colorStops: [{
            offset: 0,
            color: '#8470FF',
          }, {
            offset: 0.5,
            color: '#8470FF',
          }, {
            offset: 0.5,
            color: '#7EC0EE',
          },
          {
            offset: 1,
            color: '#7EC0EE',
          },
          ],
        },
      ];
      const barWidth = 30;

      return {

        // backgroundColor: 'white',
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter(params) {
            let tipString = `${params[0].axisValue}<br />`;
            const key = 'value';
            params.sort((obj1, obj2) => {
              const val1 = obj1[key];
              const val2 = obj2[key];
              if (val1 < val2) {
                return 1;
              } if (val1 > val2) {
                return -1;
              }
              return 0;
            });
            let indexColor;
            for (let i = 0, { length } = params; i < length; i += 1) {
              if (params[i].componentSubType === 'bar') {
                indexColor = params[i + 1].color;
                tipString += `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background:${indexColor}"></span>`;
                tipString += `<span data-type ="lineTip" data-val=${params[i].value}>${params[i].seriesName}：${params[i].value}</span><br />`;
              }
            }
            return tipString;
          },
        },
        grid: {
          left: '4%',
          right: '4%',
          bottom: '15%',
          top: '16%',
          containLabel: true,
        },
        legend: {
          data: ['May 2018', 'May 2019', 'May 2020'],
          left: 880,
          selectedMode: true, // 取消图例上的点击事件
          top: 1,
          textStyle: {
            color: 'white',
            fontSize: 14,
          },
          itemWidth: 12,
          itemHeight: 10,
          // itemGap: 35
          color: '#242424',
        },
        xAxis: {
          type: 'category',
          data: ['Vancouver', 'Edmonton', 'Saskatoon', ' Winnipeg', 'Toronto', 'Montreal', 'Halifax', 'St. Johns'],
          axisLine: {
            lineStyle: {
              color: 'white', // 左侧显示线
            },
          },
          axisLabel: {
            // interval: 0,
            // rotate: 40,
            textStyle: {
              fontFamily: 'Arial',
            },
          },
        },

        yAxis: {
          type: 'value',
          name: '         Nitrogen dioxide(ppb)',
          axisLine: {
            show: true,
            lineStyle: {
              color: 'white', // 左侧显示线
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed',
              color: 'grey',
            },
          },
          axisLabel: {
            fontSize: 14,
          },
        },
        series: [
          {
            name: 'May 2018',
            type: 'bar',
            barGap: '14%',
            barWidth: 30,
            itemStyle: {
              normal: {
                color: colors[2],
                barBorderRadius: 0,
              },

            },
            label: {
              show: true,
              position: ['6', '-20'],
              color: 'white',
              fontSize: 12,
            },
            data: nianchu,
          },
          {
            z: 2,
            name: 'May 2018',
            type: 'pictorialBar',
            data: [1, 1, 1, 1, 1, 1, 1],
            symbol: 'diamond',
            symbolOffset: ['-114%', '50%'],
            symbolSize: [barWidth, 10],
            itemStyle: {
              normal: {
                color: colors[2],
              },
            },
          },
          {
            z: 3,
            name: 'May 2018',
            type: 'pictorialBar',
            symbolPosition: 'end',
            data: nianchu,
            symbol: 'diamond',
            symbolOffset: ['-132%', '-50%'],
            symbolSize: [barWidth - 4, (10 * (barWidth - 4)) / barWidth],
            itemStyle: {
              normal: {
                borderColor: '#8470FF',
                borderWidth: 2,
                color: '#7EC0EE',
              },
            },
          },
          {
            name: '期初值',
            type: 'bar',
            barGap: '14%',
            barWidth: 30,
            itemStyle: {
              normal: {
                color: colors[1],
                barBorderRadius: 0,
              },

            },
            label: {
              show: true,
              position: ['10', '-20'],
              color: 'white',
              fontSize: 12,
            },
            data: qichu,
          }, {
            z: 2,
            name: 'May 2019',
            type: 'pictorialBar',
            data: [1, 1, 1, 1, 1, 1, 1],
            symbol: 'diamond',
            symbolOffset: [0, '50%'],
            symbolSize: [barWidth, 10],
            itemStyle: {
              normal: {
                color: colors[1],
              },
            },
          }, {
            z: 3,
            name: 'May 2019',
            type: 'pictorialBar',
            symbolPosition: 'end',
            data: qichu,
            symbol: 'diamond',
            symbolOffset: [0, '-50%'],
            symbolSize: [barWidth - 4, (10 * (barWidth - 4)) / barWidth],
            itemStyle: {
              normal: {
                borderColor: '#49dff0',
                borderWidth: 2,
                color: '#abe8ef',
              },
            },
          },
          {
            name: 'May 2020',
            type: 'bar',
            barGap: '14%',
            barWidth: 30,
            itemStyle: {
              normal: {
                color: colors[0],
                barBorderRadius: 0,
              },

            },
            label: {
              show: true,
              position: ['8', '-20'],
              color: 'white',
              fontSize: 12,
            },
            data: dangqian,
          }, {
            z: 2,
            name: 'May 2020',
            type: 'pictorialBar',
            data: [1, 1, 1, 1, 1, 1, 1],
            symbol: 'diamond',
            symbolOffset: ['114%', '50%'],
            symbolSize: [barWidth, 10],
            itemStyle: {
              normal: {
                color: colors[0],
              },
            },
          }, {
            z: 3,
            name: 'May 2020',
            type: 'pictorialBar',
            symbolPosition: 'end',
            data: dangqian,
            symbol: 'diamond',
            symbolOffset: ['132%', '-50%'],
            symbolSize: [barWidth - 4, (10 * (barWidth - 4)) / barWidth],
            itemStyle: {
              normal: {
                borderColor: '#FF7256',
                borderWidth: 2,
                color: '#FFC0CB',
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
