<template>
  <div ref="chart" :style="chartStyle"></div>
</template>

<script>
import echarts from 'echarts';

export default {
  name: 'graphtable',
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
      const option = {
        width: '100%',
        tooltip: {
          show: false,
          trigger: 'axis',
          axisPointer: {
            type: 'none',
          },
        },
        grid: [{
          show: false,
          x: '18',
          y: '0',
          top: 40,
          bottom: 10,
          width: '210',
          containLabel: true,
        }, {
          show: true,
          x: '210',
          y: '0',
          top: 40,
          bottom: 10,
          width: '105',
          containLabel: true,
        }, {
          show: true,
          x: '315',
          y: '0',
          top: 40,
          bottom: 10,
          width: '105',
          containLabel: true,
        }, {
          show: true,
          x: '420',
          y: '0',
          top: 40,
          bottom: 10,
          width: '105',
          containLabel: true,
        }, {
          show: true,
          x: '525',
          y: '0',
          top: 40,
          bottom: 10,
          width: '105',
          containLabel: true,
        }, {
          show: true,
          x: '630',
          y: '0',
          top: 40,
          bottom: 10,
          width: '105',
          containLabel: true,
        }, {
          show: true,
          x: '735',
          y: '0',
          top: 40,
          bottom: 10,
          width: '105',
          containLabel: true,
        }, {
          show: true,
          x: '840',
          y: '0',
          top: 40,
          bottom: 10,
          width: '105',
          containLabel: true,
        }, {
          show: true,
          x: '945',
          y: '0',
          top: 40,
          bottom: 10,
          width: '105',
          containLabel: true,
        }, {
          show: true,
          x: '1050',
          y: '0',
          top: 40,
          bottom: 10,
          width: '105',
          containLabel: true,
        }, {
          show: true,
          x: '1155',
          y: '0',
          top: 40,
          bottom: 10,
          width: '105',
          containLabel: true,
        }, {
          show: false,
          x: '1260',
          y: '0',
          top: 40,
          bottom: 10,
          width: '105',
          containLabel: true,
        }],
        xAxis: [{
          name: '2016-06',
          nameLocation: 'middle',
          min: -20,
          max: 20,
          type: 'value',
          position: 'top',
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          splitLine: {
            lineStyle: {
              type: 'solid',
            },
            show: false,
          },
          gridIndex: 0,
        }, {
          name: '2016-07',
          nameLocation: 'middle',
          min: -20,
          max: 20,
          type: 'value',
          position: 'top',
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          splitLine: {
            lineStyle: {
              type: 'solid',
            },
            show: false,
          },
          gridIndex: 1,
        }, {
          name: '2016-08',
          nameLocation: 'middle',
          min: -20,
          max: 20,
          type: 'value',
          position: 'top',
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          splitLine: {
            lineStyle: {
              type: 'solid',
            },
            show: false,
          },
          gridIndex: 2,
        }, {
          name: '2016-09',
          nameLocation: 'middle',
          min: -20,
          max: 20,
          type: 'value',
          position: 'top',
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          splitLine: {
            lineStyle: {
              type: 'solid',
            },
            show: false,
          },
          gridIndex: 3,
        }, {
          name: '2016-10',
          nameLocation: 'middle',
          min: -20,
          max: 20,
          type: 'value',
          position: 'top',
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          splitLine: {
            lineStyle: {
              type: 'solid',
            },
            show: false,
          },
          gridIndex: 4,
        }, {
          name: '2016-11',
          nameLocation: 'middle',
          min: -20,
          max: 20,
          type: 'value',
          position: 'top',
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          splitLine: {
            lineStyle: {
              type: 'solid',
            },
            show: false,
          },
          gridIndex: 5,
        }, {
          name: '2016-12',
          nameLocation: 'middle',
          min: -20,
          max: 20,
          type: 'value',
          position: 'top',
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          splitLine: {
            lineStyle: {
              type: 'solid',
            },
            show: false,
          },
          gridIndex: 6,
        }, {
          name: '2017-01',
          nameLocation: 'middle',
          min: -20,
          max: 20,
          type: 'value',
          position: 'top',
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          splitLine: {
            lineStyle: {
              type: 'solid',
            },
            show: false,
          },
          gridIndex: 7,
        }, {
          name: '2017-02',
          nameLocation: 'middle',
          min: -20,
          max: 20,
          type: 'value',
          position: 'top',
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          splitLine: {
            lineStyle: {
              type: 'solid',
            },
            show: false,
          },
          gridIndex: 8,
        }, {
          name: '2017-03',
          nameLocation: 'middle',
          min: -20,
          max: 20,
          type: 'value',
          position: 'top',
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          splitLine: {
            lineStyle: {
              type: 'solid',
            },
            show: false,
          },
          gridIndex: 9,
        }, {
          name: '2017-04',
          nameLocation: 'middle',
          min: -20,
          max: 20,
          type: 'value',
          position: 'top',
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          splitLine: {
            lineStyle: {
              type: 'solid',
            },
            show: false,
          },
          gridIndex: 10,
        }, {
          name: '2017-05',
          nameLocation: 'middle',
          min: -20,
          max: 20,
          type: 'value',
          position: 'top',
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          splitLine: {
            lineStyle: {
              type: 'solid',
            },
            show: false,
          },
          gridIndex: 11,
        }],
        yAxis: [{
          type: 'category',
          position: 'top',
          min: 0,
          offset: -1,
          splitNumber: 2,
          axisLine: {
            show: true,
            lineStyle: {
              color: '#999',
              type: 'solid',
            },
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#333',
              fontSize: 13,
              lineHeight: 20,
            },
            rich: {
              value: {
                lineHeight: 1,
              },
            },
          },
          axisTick: {
            show: false,
            inside: false,
            length: 1089,
          },
          splitLine: {
            show: false,
          },
          gridIndex: 0,
          data: ['交通运输', '休闲服务', '传媒', '公用事业', '农林牧渔', '化工', '医药生物', '商业贸易', '国防军工', '家用电器', '建筑材料', '建筑装饰', '房地产', '有色金属', '机械设备', '汽车', '电子', '电气设备', '纺织服装', '综合', '计算机', '轻工制造', '通信', '采掘', '钢铁', '非银金融', '食品饮料'],
        }, {
          type: 'category',
          axisLine: {
            show: true,
            lineStyle: {
              color: '#999',
              type: 'solid',
            },
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#333',
              fontSize: 13,
              lineHeight: 20,
            },
            rich: {
              value: {
                lineHeight: 1,
              },
            },
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          gridIndex: 1,
          data: [],
        }, {
          type: 'category',
          axisLine: {
            show: true,
            lineStyle: {
              color: '#999',
              type: 'solid',
            },
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#333',
              fontSize: 13,
              lineHeight: 20,
            },
            rich: {
              value: {
                lineHeight: 1,
              },
            },
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          gridIndex: 2,
          data: [],
        }, {
          type: 'category',
          axisLine: {
            show: true,
            lineStyle: {
              color: '#999',
              type: 'solid',
            },
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#333',
              fontSize: 13,
              lineHeight: 20,
            },
            rich: {
              value: {
                lineHeight: 1,
              },
            },
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          gridIndex: 3,
          data: [],
        }, {
          type: 'category',
          axisLine: {
            show: true,
            lineStyle: {
              color: '#999',
              type: 'solid',
            },
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#333',
              fontSize: 13,
              lineHeight: 20,
            },
            rich: {
              value: {
                lineHeight: 1,
              },
            },
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          gridIndex: 4,
          data: [],
        }, {
          type: 'category',
          axisLine: {
            show: true,
            lineStyle: {
              color: '#999',
              type: 'solid',
            },
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#333',
              fontSize: 13,
              lineHeight: 20,
            },
            rich: {
              value: {
                lineHeight: 1,
              },
            },
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          gridIndex: 5,
          data: [],
        }, {
          type: 'category',
          axisLine: {
            show: true,
            lineStyle: {
              color: '#999',
              type: 'solid',
            },
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#333',
              fontSize: 13,
              lineHeight: 20,
            },
            rich: {
              value: {
                lineHeight: 1,
              },
            },
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          gridIndex: 6,
          data: [],
        }, {
          type: 'category',
          axisLine: {
            show: true,
            lineStyle: {
              color: '#999',
              type: 'solid',
            },
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#333',
              fontSize: 13,
              lineHeight: 20,
            },
            rich: {
              value: {
                lineHeight: 1,
              },
            },
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          gridIndex: 7,
          data: [],
        }, {
          type: 'category',
          axisLine: {
            show: true,
            lineStyle: {
              color: '#999',
              type: 'solid',
            },
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#333',
              fontSize: 13,
              lineHeight: 20,
            },
            rich: {
              value: {
                lineHeight: 1,
              },
            },
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          gridIndex: 8,
          data: [],
        }, {
          type: 'category',
          axisLine: {
            show: true,
            lineStyle: {
              color: '#999',
              type: 'solid',
            },
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#333',
              fontSize: 13,
              lineHeight: 20,
            },
            rich: {
              value: {
                lineHeight: 1,
              },
            },
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          gridIndex: 9,
          data: [],
        }, {
          type: 'category',
          axisLine: {
            show: true,
            lineStyle: {
              color: '#999',
              type: 'solid',
            },
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#333',
              fontSize: 13,
              lineHeight: 20,
            },
            rich: {
              value: {
                lineHeight: 1,
              },
            },
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          gridIndex: 10,
          data: [],
        }, {
          type: 'category',
          axisLine: {
            show: true,
            lineStyle: {
              color: '#999',
              type: 'solid',
            },
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#333',
              fontSize: 13,
              lineHeight: 20,
            },
            rich: {
              value: {
                lineHeight: 1,
              },
            },
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          gridIndex: 11,
          data: [],
        }],
        series: [{
          type: 'bar',
          barWidth: '14px',
          yAxisIndex: 0,
          xAxisIndex: 0,
          label: {
            normal: {
              show: true,
            },
          },
          itemStyle: {
            normal: {
              borderWidth: 1,
              borderColor: '#fe8282',
            },
          },
          data: [{
            value: -2.5611,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -0.4577,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -5.1773,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -3.4857,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -2.8473,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -5.4534,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -11.8089,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -3.9663,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -3.37,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -1.0852,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -1.7714,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -2.386,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -5.9286,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -5.7826,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -5.1072,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -4.0343,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -8.1505,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -5.2619,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -1.0553,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -0.9788,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -5.8579,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -2.7364,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -2.397,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -2.216,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -0.5116,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -0.8153,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -2.1788,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }],
        }, {
          type: 'bar',
          barWidth: '14px',
          yAxisIndex: 1,
          xAxisIndex: 1,
          label: {
            normal: {
              show: true,
            },
          },
          itemStyle: {
            normal: {
              borderWidth: 1,
              borderColor: '#fe8282',
            },
          },
          data: [{
            value: -2.6445,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -0.4729,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -5.0473,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -3.4775,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -2.9773,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -5.7229,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -12.1459,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -3.9436,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: '--',
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -1.1136,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -1.7987,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -2.4887,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -5.9963,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -5.7064,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -4.9566,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -3.8475,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -7.6377,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -5.2004,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -1.0395,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -0.983,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -5.4585,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -2.7828,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -2.4902,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -2.3243,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -0.5412,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -0.9811,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -2.1966,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }],
        }, {
          type: 'bar',
          barWidth: '14px',
          yAxisIndex: 2,
          xAxisIndex: 2,
          label: {
            normal: {
              show: true,
            },
          },
          itemStyle: {
            normal: {
              borderWidth: 1,
              borderColor: '#fe8282',
            },
          },
          data: [{
            value: -2.6106,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -0.4445,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -5.1037,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -3.628,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -2.9188,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -5.7434,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -12.1198,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -3.929,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -3.3187,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -1.0709,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -1.8216,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -2.5725,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -6.2747,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -5.6278,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -4.8162,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -3.8087,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -7.6508,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -5.2118,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -1.0176,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -0.9897,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -5.3181,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -2.7173,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -2.5905,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -2.3726,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -0.5555,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -1.0047,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -2.1071,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }],
        }, {
          type: 'bar',
          barWidth: '14px',
          yAxisIndex: 3,
          xAxisIndex: 3,
          label: {
            normal: {
              show: true,
            },
          },
          itemStyle: {
            normal: {
              borderWidth: 1,
              borderColor: '#fe8282',
            },
          },
          data: [{
            value: -2.5696,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -0.4207,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -4.9602,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -3.5939,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -2.9001,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -5.8445,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -12.0868,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -3.9033,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -3.3071,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -1.1097,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -1.907,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -2.6331,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -6.4367,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -5.4447,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -4.9487,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -4.0786,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -7.6076,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -4.9942,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -1.0228,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -0.9694,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -5.1885,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -2.7635,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -2.6629,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -2.3493,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -0.5417,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -1.0423,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -2.0773,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }],
        }, {
          type: 'bar',
          barWidth: '14px',
          yAxisIndex: 4,
          xAxisIndex: 4,
          label: {
            normal: {
              show: true,
            },
          },
          itemStyle: {
            normal: {
              borderWidth: 1,
              borderColor: '#fe8282',
            },
          },
          data: [{
            value: -2.6357,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -0.4564,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -4.9663,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -3.6066,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -2.8071,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -5.8741,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -12.0323,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -3.867,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: '--',
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -1.0643,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -1.87,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -2.6025,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -6.1694,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -5.5985,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -5.018,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -4.0346,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -7.6233,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -5.0286,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -1.02,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -0.985,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -5.3128,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -2.724,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -2.6719,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -2.4817,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -0.5325,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -1.0147,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -2.1793,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }],
        }, {
          type: 'bar',
          barWidth: '14px',
          yAxisIndex: 5,
          xAxisIndex: 5,
          label: {
            normal: {
              show: true,
            },
          },
          itemStyle: {
            normal: {
              borderWidth: 1,
              borderColor: '#fe8282',
            },
          },
          data: [{
            value: -2.7511,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -0.439,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: '--',
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -3.6524,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -2.8363,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -6.0151,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -11.6832,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -3.9792,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -3.2287,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -1.0337,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -1.9485,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -2.5384,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -6.1987,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -5.7271,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -5.132,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -4.0267,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -7.378,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -4.9475,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -1.0582,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: '--',
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -5.2099,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -2.7028,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -2.6606,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -2.4533,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -0.558,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: '--',
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -2.126,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }],
        }, {
          type: 'bar',
          barWidth: '14px',
          yAxisIndex: 6,
          xAxisIndex: 6,
          label: {
            normal: {
              show: true,
            },
          },
          itemStyle: {
            normal: {
              borderWidth: 1,
              borderColor: '#fe8282',
            },
          },
          data: [{
            value: -2.5063,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -0.4567,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -4.4125,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -4.423,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -2.3955,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -6.2113,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -12.7527,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -4.0748,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: '--',
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -1.1441,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -1.8999,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -1.992,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -5.7374,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -5.745,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -4.2287,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -3.0608,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -7.9899,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -5.1656,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -0.9904,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -0.917,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -5.4626,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -2.4718,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -2.6308,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -1.8739,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: '--',
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -1.3059,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -2.563,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }],
        }, {
          type: 'bar',
          barWidth: '14px',
          yAxisIndex: 7,
          xAxisIndex: 7,
          label: {
            normal: {
              show: true,
            },
          },
          itemStyle: {
            normal: {
              borderWidth: 1,
              borderColor: '#fe8282',
            },
          },
          data: [{
            value: -2.5375,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -0.4469,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -4.2752,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -4.396,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -2.3483,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -6.167,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -12.7386,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -4.08,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: '--',
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -1.1321,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -2.0695,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -1.9657,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -5.6365,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -5.9322,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -4.2008,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -3.1263,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -7.7327,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -5.0975,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -0.9667,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -0.9045,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -5.4741,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -2.5702,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: '--',
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -1.938,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -1.5169,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -1.4052,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -2.5648,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }],
        }, {
          type: 'bar',
          barWidth: '14px',
          yAxisIndex: 8,
          xAxisIndex: 8,
          label: {
            normal: {
              show: true,
            },
          },
          itemStyle: {
            normal: {
              borderWidth: 1,
              borderColor: '#fe8282',
            },
          },
          data: [{
            value: -2.6198,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: '--',
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -4.1802,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -4.4458,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -2.4159,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -6.1953,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -12.6227,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -4.0082,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -3.4525,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -1.1609,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -2.2789,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -1.9605,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -5.7497,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -5.7696,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -4.387,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -3.0948,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -7.7878,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -5.0987,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -0.9565,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -0.9275,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -5.5179,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -2.5538,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -2.6116,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -1.8728,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -1.5425,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -1.2808,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -2.6179,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }],
        }, {
          type: 'bar',
          barWidth: '14px',
          yAxisIndex: 9,
          xAxisIndex: 9,
          label: {
            normal: {
              show: true,
            },
          },
          itemStyle: {
            normal: {
              borderWidth: 1,
              borderColor: '#fe8282',
            },
          },
          data: [{
            value: -2.6431,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: '--',
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -4.0616,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -4.4408,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -2.3742,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -6.0907,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -12.4875,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -3.9303,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: '--',
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -1.23,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -2.3007,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -2.0954,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -5.625,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -5.7777,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -4.4697,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -3.011,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -8.1626,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -5.0541,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -0.918,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -0.8744,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -5.4354,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -2.5595,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -2.7252,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -1.8474,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: '--',
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -1.2845,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -2.5871,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }],
        }, {
          type: 'bar',
          barWidth: '14px',
          yAxisIndex: 10,
          xAxisIndex: 10,
          label: {
            normal: {
              show: true,
            },
          },
          itemStyle: {
            normal: {
              borderWidth: 1,
              borderColor: '#fe8282',
            },
          },
          data: [{
            value: -2.793,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -0.4504,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -3.9748,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -4.6275,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -2.4308,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -6.1607,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -12.4386,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -3.8265,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -3.4508,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -1.378,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -2.4719,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -2.0858,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -5.7703,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -5.5132,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -4.5489,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -2.9762,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -8.0726,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -4.9326,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -0.9564,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -0.8861,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -5.4718,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -2.5443,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -2.6261,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -1.7144,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -1.4903,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -1.3212,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -2.5916,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }],
        }, {
          type: 'bar',
          barWidth: '14px',
          yAxisIndex: 11,
          xAxisIndex: 11,
          label: {
            normal: {
              show: true,
            },
          },
          itemStyle: {
            normal: {
              borderWidth: 1,
              borderColor: '#fe8282',
            },
          },
          data: [{
            value: -2.7462,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -0.4271,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -3.9053,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -4.5872,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -2.4243,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -6.0948,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -12.4669,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -3.9289,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -3.223,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -1.4773,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -2.4116,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -2.1028,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -5.8465,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -5.5777,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -4.4653,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -2.9574,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -8.1436,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -4.7403,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -0.9453,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -0.8573,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -5.5057,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -2.6611,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -2.7992,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -1.6872,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -1.4856,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -1.393,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }, {
            value: -2.6282,
            itemStyle: {
              normal: {
                borderColor: '#55d580',
              },
            },
            label: {
              normal: {
                color: '#666',
                position: 'right',
              },
            },
          }],
        }],
        graphic: [{
          type: 'rect',
          z: 100,
          left: '0',
          top: '0',
          shape: {
            width: 1373,
            height: 879,
          },
          style: {
            fill: 'transparent',
            stroke: '#999',
            lineWidth: 1,
          },
        }, {
          type: 'rect',
          z: 100,
          left: '0',
          top: '0',
          shape: {
            width: 88,
            height: 879,
          },
          style: {
            fill: 'transparent',
            stroke: '#999',
            lineWidth: 1,
          },
        }, {
          type: 'rect',
          z: 100,
          left: '0%',
          top: '0%',
          shape: {
            width: 1373,
            height: 39,
          },
          style: {
            fill: 'transparent',
            stroke: '#999',
            lineWidth: 1,
          },
        }, {
          type: 'rect',
          z: 100,
          left: '210',
          top: '0%',
          shape: {
            width: 105,
            height: 39,
          },
          style: {
            fill: 'transparent',
            stroke: '#999',
            lineWidth: 1,
          },
        }, {
          type: 'rect',
          z: 100,
          left: '315',
          top: '0%',
          shape: {
            width: 105,
            height: 39,
          },
          style: {
            fill: 'transparent',
            stroke: '#999',
            lineWidth: 1,
          },
        }, {
          type: 'rect',
          z: 100,
          left: '420',
          top: '0%',
          shape: {
            width: 105,
            height: 39,
          },
          style: {
            fill: 'transparent',
            stroke: '#999',
            lineWidth: 1,
          },
        }, {
          type: 'rect',
          z: 100,
          left: '525',
          top: '0%',
          shape: {
            width: 105,
            height: 39,
          },
          style: {
            fill: 'transparent',
            stroke: '#999',
            lineWidth: 1,
          },
        }, {
          type: 'rect',
          z: 100,
          left: '630',
          top: '0%',
          shape: {
            width: 105,
            height: 39,
          },
          style: {
            fill: 'transparent',
            stroke: '#999',
            lineWidth: 1,
          },
        }, {
          type: 'rect',
          z: 100,
          left: '735',
          top: '0%',
          shape: {
            width: 105,
            height: 39,
          },
          style: {
            fill: 'transparent',
            stroke: '#999',
            lineWidth: 1,
          },
        }, {
          type: 'rect',
          z: 100,
          left: '840',
          top: '0%',
          shape: {
            width: 105,
            height: 39,
          },
          style: {
            fill: 'transparent',
            stroke: '#999',
            lineWidth: 1,
          },
        }, {
          type: 'rect',
          z: 100,
          left: '945',
          top: '0%',
          shape: {
            width: 105,
            height: 39,
          },
          style: {
            fill: 'transparent',
            stroke: '#999',
            lineWidth: 1,
          },
        }, {
          type: 'rect',
          z: 100,
          left: '1050',
          top: '0%',
          shape: {
            width: 105,
            height: 39,
          },
          style: {
            fill: 'transparent',
            stroke: '#999',
            lineWidth: 1,
          },
        }, {
          type: 'rect',
          z: 100,
          left: '1155',
          top: '0%',
          shape: {
            width: 105,
            height: 39,
          },
          style: {
            fill: 'transparent',
            stroke: '#999',
            lineWidth: 1,
          },
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
