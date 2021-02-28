<template>
  <div ref="chart"  :style="chartStyle">
  </div>
</template>

<script>
import echarts from 'echarts';

export default {
  name: 'temperature',
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
      const tempValue = 40;
      const kd = [];
      const Gradient = [];
      let leftColor = '';
      let showValue = '';
      let boxPosition = [65, 0];
      let tempTxt = '';
      // 刻度使用柱状图模拟，短设置1，长的设置3；构造一个数据
      for (let i = 0, len = 135; i <= len; i += 1) {
        if (i < 10 || i > 130) {
          kd.push('');
        } else if ((i - 10) % 20 === 0) {
          kd.push('-3');
        } else if ((i - 10) % 4 === 0) {
          kd.push('-1');
        } else {
          kd.push('');
        }
      }
      // 中间线的渐变色和文本内容
      if (tempValue > 20) {
        tempTxt = '温度偏高';
        Gradient.push({
          offset: 0,
          color: '#93FE94',
        }, {
          offset: 0.5,
          color: '#E4D225',
        }, {
          offset: 1,
          color: '#E01F28',
        });
      } else if (tempValue > -20) {
        tempTxt = '温度正常';
        Gradient.push({
          offset: 0,
          color: '#93FE94',
        }, {
          offset: 1,
          color: '#E4D225',
        });
      } else {
        tempTxt = '温度偏低';
        Gradient.push({
          offset: 1,
          color: '#93FE94',
        });
      }
      if (tempValue > 62) {
        showValue = 62;
      } else if (tempValue < -60) {
        showValue = -60;
      } else {
        showValue = tempValue;
      }
      if (tempValue < -10) {
        boxPosition = [65, -120];
      }
      leftColor = Gradient[Gradient.length - 1].color;
      // 因为柱状初始化为0，温度存在负值，所以加上负值60和空出距离10
      const option = {
        // backgroundColor: '#0C2F6F',
        title: {
          text: '温度计',
          show: false,
        },
        yAxis: [{
          show: false,
          data: [],
          min: 0,
          max: 135,
          axisLine: {
            show: false,
          },
        }, {
          show: false,
          min: 0,
          max: 50,
        }, {
          type: 'category',
          data: ['', '', '', '', '', '', '', '', '', '', '°C'],
          position: 'left',
          offset: -80,
          axisLabel: {
            fontSize: 10,
            color: 'white',
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
        }],
        xAxis: [{
          show: false,
          min: -10,
          max: 80,
          data: [],
        }, {
          show: false,
          min: -10,
          max: 80,
          data: [],
        }, {
          show: false,
          min: -10,
          max: 80,
          data: [],
        }, {
          show: false,
          min: -5,
          max: 80,

        }],
        series: [{
          name: '条',
          type: 'bar',
          // 对应上面XAxis的第一个对)象配置
          xAxisIndex: 0,
          data: [{
            value: (showValue + 70),
            label: {
              normal: {
                show: true,
                position: boxPosition,
                backgroundColor: {
                  image: 'plugin/subway_beijing/images/power/bg5Valuebg.png', // 文字框背景图
                },
                width: 200,
                height: 100,
                formatter: `{back| ${tempValue} }{unit|°C}\n{downTxt|${tempTxt}}`,
                rich: {
                  back: {
                    align: 'center',
                    lineHeight: 50,
                    fontSize: 40,
                    fontFamily: 'digifacewide',
                    color: leftColor,
                  },
                  unit: {
                    fontFamily: '微软雅黑',
                    fontSize: 15,
                    lineHeight: 50,
                    color: leftColor,
                  },
                  downTxt: {
                    lineHeight: 50,
                    fontSize: 25,
                    align: 'center',
                    color: '#fff',
                  },
                },
              },
            },
          }],

          barWidth: 18,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 1, 0, 0, Gradient),
            },
          },
          z: 2,
        }, {
          name: '白框',
          type: 'bar',
          xAxisIndex: 1,
          barGap: '-100%',
          data: [134],
          barWidth: 28,
          itemStyle: {
            normal: {
              color: '#0C2E6D',
              barBorderRadius: 50,
            },
          },
          z: 1,
        }, {
          name: '外框',
          type: 'bar',
          xAxisIndex: 2,
          barGap: '-100%',
          data: [135],
          barWidth: 38,
          itemStyle: {
            normal: {
              color: '#4577BA',
              barBorderRadius: 50,
            },
          },
          z: 0,
        }, {
          name: '圆',
          type: 'scatter',
          hoverAnimation: false,
          data: [0],
          xAxisIndex: 0,
          symbolSize: 48,
          itemStyle: {
            normal: {
              color: '#93FE94',
              opacity: 1,
            },
          },
          z: 2,
        }, {
          name: '白圆',
          type: 'scatter',
          hoverAnimation: false,
          data: [0],
          xAxisIndex: 1,
          symbolSize: 60,
          itemStyle: {
            normal: {
              color: '#0C2E6D',
              opacity: 1,
            },
          },
          z: 1,
        }, {
          name: '外圆',
          type: 'scatter',
          hoverAnimation: false,
          data: [0],
          xAxisIndex: 2,
          symbolSize: 70,
          itemStyle: {
            normal: {
              color: '#4577BA',
              opacity: 1,
            },
          },
          z: 0,
        }, {
          name: '刻度',
          type: 'bar',
          yAxisIndex: 0,
          xAxisIndex: 3,
          label: {
            normal: {
              show: true,
              position: 'left',
              distance: 10,
              color: 'white',
              fontSize: 14,
              formatter(params) {
                if (params.dataIndex > 130 || params.dataIndex < 10) {
                  return '';
                }
                if ((params.dataIndex - 10) % 20 === 0) {
                  return params.dataIndex - 70;
                }
                return '';
              },
            },
          },
          barGap: '-100%',
          data: kd,
          barWidth: 1,
          itemStyle: {
            normal: {
              color: 'white',
              barBorderRadius: 120,
            },
          },
          z: 0,
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

<style scoped lang="stylus">

</style>
