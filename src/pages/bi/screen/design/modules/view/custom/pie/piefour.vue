<template>
  <div ref="chart"  :style="chartStyle">
  </div>
</template>

<script>
import echarts from 'echarts';

require('echarts-liquidfill');

export default {
  name: 'piefour',
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
      const scaleData = [{
        name: '红灯 14',
        value: 14,
        radius1: [108, 110],
        radius2: '25%',
      }, {
        name: '黄灯 32',
        value: 32,
        radius1: [130, 132],
        radius2: '30%',
      }, {
        name: '绿灯 288',
        value: 288,
        radius1: [152, 154],
        radius2: '35%',
      }, {
        name: '挂起 463',
        value: 463,
        radius1: [174, 176],
        radius2: '40%',
      },
      ];
      const placeHolderStyle = {
        normal: {
          label: {
            show: false,
          },
          labelLine: {
            show: false,
          },
          color: 'rgba(0, 0, 0, 0)',
          borderColor: 'rgba(0, 0, 0, 0)',
          borderWidth: 0,
        },
      };
      const seriesObj = [];
      const color = ['#FF647C', '#FFBE75', '#3EE2A5', '#6C77FD'];
      for (let i = 0; i < scaleData.length; i += 1) {
        seriesObj.push({
          name: '',
          type: 'pie',
          radius: scaleData[i].radius1,
          hoverAnimation: false,
          itemStyle: {
            normal: {
              label: {
                show: false,
                color: '#ddd',
              },
            },
          },
          data: [{
            value: scaleData[i].value,
            name: scaleData[i].name,
            itemStyle: {
              normal: {
                borderWidth: 5,
                borderColor: color[i],
              },
            },
          }, {
            value: 200,
            name: '',
            itemStyle: placeHolderStyle,
          }],
        }, {
          name: '',
          type: 'gauge',
          detail: false,
          splitNumber: 10, // 刻度数量
          radius: scaleData[i].radius2, // 图表尺寸
          center: ['50%', '50%'],
          startAngle: 0, // 开始刻度的角度
          endAngle: -356, // 结束刻度的角度
          axisLine: {
            show: false,
            lineStyle: {
              width: 0,
              shadowBlur: 0,
            },
          },
          axisTick: {
            show: true,
            lineStyle: {
              color: 'rgba(220,220,220,0.5)',
              width: 5,
            },
            length: 5,
            splitNumber: 5,
          },
          splitLine: {
            show: false,
            length: 5,
            lineStyle: {
              color: 'rgba(220,220,220,0.1)',
            },
          },
          axisLabel: {
            show: false,
          },
        });
      }
      const option = {
        // backgroundColor: '#04243E',
        color,
        tooltip: {
          show: false,
        },
        legend: {
          orient: 'vertical',
          x: '200',
          y: 'center',
          itemGap: 35,
          data: ['挂起 463', '红灯 14', '黄灯 32', '绿灯 288'],
          show: true,
          textStyle: {
            color: '#fff',
          },
        },
        toolbox: {
          show: false,
        },
        series: seriesObj,
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
