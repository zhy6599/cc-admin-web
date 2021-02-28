<template>
  <div ref="chart" :style="chartStyle"></div>
</template>

<script>
import echarts from 'echarts';

export default {
  name: 'barhorizontal',
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
      const category = [{
        name: '管控',
        value: 2500,
      },
      {
        name: '集中式',
        value: 8000,
      },
      {
        name: '纳管',
        value: 3000,
      },
      {
        name: '纳管',
        value: 3000,
      },
      {
        name: '纳管',
        value: 3000,
      },
      ]; // 类别
      const total = 10000; // 数据总数
      const datas = [];
      category.forEach((value) => {
        datas.push(value.value);
      });
      return {
        // backgroundColor: '#071347',
        xAxis: {
          max: total,
          splitLine: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          axisTick: {
            show: false,
          },
        },
        grid: {
          left: 80,
          top: 20, // 设置条形图的边距
          right: 80,
          bottom: 20,
        },
        yAxis: [{
          type: 'category',
          inverse: false,
          data: category,
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
        }],
        series: [{
          // 内
          type: 'bar',
          barWidth: 18,

          legendHoverLink: false,
          silent: true,
          itemStyle: {
            normal: {
              color(params) {
                let color;
                if (params.dataIndex === 19) {
                  color = {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 1,
                    y2: 0,
                    colorStops: [{
                      offset: 0,
                      color: '#EB5118', // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: '#F21F02', // 100% 处的颜色
                    },
                    ],
                  };
                } else if (params.dataIndex === 18) {
                  color = {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 1,
                    y2: 0,
                    colorStops: [{
                      offset: 0,
                      color: '#FFA048', // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: '#B25E14', // 100% 处的颜色
                    },
                    ],
                  };
                } else if (params.dataIndex === 17) {
                  color = {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 1,
                    y2: 0,
                    colorStops: [{
                      offset: 0,
                      color: '#F8E972', // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: '#E5C206', // 100% 处的颜色
                    },
                    ],
                  };
                } else {
                  color = {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 1,
                    y2: 0,
                    colorStops: [{
                      offset: 0,
                      color: '#1588D1', // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: '#0F4071', // 100% 处的颜色
                    },
                    ],
                  };
                }
                return color;
              },
            },
          },
          label: {
            normal: {
              show: true,
              position: 'left',
              formatter: '{b}',
              textStyle: {
                color: '#fff',
                fontSize: 14,
              },
            },
          },
          data: category,
          z: 1,
          animationEasing: 'elasticOut',
        },
        {
          // 分隔
          type: 'pictorialBar',
          itemStyle: {
            normal: {
              color: '#061348',
            },
          },
          symbolRepeat: 'fixed',
          symbolMargin: 6,
          symbol: 'rect',
          symbolClip: true,
          symbolSize: [1, 21],
          symbolPosition: 'start',
          symbolOffset: [1, -1],
          symbolBoundingData: this.total,
          data: category,
          z: 2,
          animationEasing: 'elasticOut',
        },
        {
          // 外边框
          type: 'pictorialBar',
          symbol: 'rect',
          symbolBoundingData: total,
          itemStyle: {
            normal: {
              color: 'none',
            },
          },
          label: {
            normal: {
              formatter: (params) => {
                let text;
                if (params.dataIndex === 1) {
                  text = `{a|  100%}{f|  ${params.data}}`;
                } else if (params.dataIndex === 2) {
                  text = `{b|  100%}{f|  ${params.data}}`;
                } else if (params.dataIndex === 3) {
                  text = `{c|  100%}{f|  ${params.data}}`;
                } else {
                  text = `{d|  100%}{f|  ${params.data}}`;
                }
                return text;
              },
              rich: {
                a: {
                  color: 'red',
                },
                b: {
                  color: 'blue',
                },
                c: {
                  color: 'yellow',
                },
                d: {
                  color: 'green',
                },
                f: {
                  color: '#ffffff',
                },
              },
              position: 'right',
              distance: 0, // 向右偏移位置
              show: true,
            },
          },
          data: datas,
          z: 0,
          animationEasing: 'elasticOut',
        },
        {
          name: '外框',
          type: 'bar',
          barGap: '-120%', // 设置外框粗细
          data: [total, total, total, total, total, total, total, total, total, total, total,
            total, total, total, total, total, total, total, total, total],
          barWidth: 25,
          itemStyle: {
            normal: {
              color: 'transparent', // 填充色
              barBorderColor: '#1C4B8E', // 边框色
              barBorderWidth: 1, // 边框宽度
              // barBorderRadius: 0, //圆角半径
              label: {
                // 标签显示位置
                show: false,
                position: 'top', // insideTop 或者横向的 insideLeft
              },
            },
          },
          z: 0,
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

<style scoped lang="stylus"></style>
