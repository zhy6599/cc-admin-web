<template>
  <div ref="chart"  :style="chartStyle">
  </div>
</template>

<script>
import echarts from 'echarts';

export default {
  name: 'barbattery',
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
        name: '累计完成',
        value: 612.5,
      },
      {
        name: '标准进度',
        value: 548.7,
      },
      {
        name: '上月完成率',
        value: 300.2,
      },
      {
        name: '本月完成率',
        value: 300,
      },
      ]; // 类别
      const total = 1000; // 数据总数
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
          left: 100,
          top: 10, // 设置条形图的边距
          right: 80,
          bottom: 10,
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
        series: [
          {
            // 内
            type: 'bar',
            barWidth: 28,
            silent: true,
            itemStyle: {
              normal: {
                color: '#1588D1',
              },
            },
            label: {
              normal: {
                formatter: '{b}',
                textStyle: {
                  color: '#fff',
                  fontSize: 14,
                },
                position: 'left',
                distance: 20, // 向右偏移位置
                show: true,
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
                color: '#07314a',
              },
            },
            symbolRepeat: 'fixed',
            symbolMargin: 2,
            symbol: 'rect',
            symbolClip: true,
            symbolSize: [3, 28],
            symbolPosition: 'start',
            symbolOffset: [3, -4],
            symbolBoundingData: this.total,
            data: [total, total, total, total],
            z: 2,
            animationEasing: 'elasticOut',

          },
          {
            // label
            type: 'pictorialBar',
            symbolBoundingData: total,
            itemStyle: {
              normal: {
                color: 'none',
              },
            },
            label: {
              normal: {
                formatter: (params) => `{f| ${((params.data * 100) / total).toFixed(2)}%}`,
                rich: {
                  f: {
                    color: '#ffffff',
                  },
                },
                position: 'right',
                distance: 10, // 向右偏移位置
                show: true,
              },
            },
            data: datas,
            z: 0,

          },

          {
            name: '外框',
            type: 'bar',
            barGap: '-130%', // 设置外框粗细
            data: [total, total, total, total],
            barWidth: 45,
            itemStyle: {
              normal: {
                barBorderRadius: [5, 5, 5, 5],
                color: 'transparent', // 填充色
                barBorderColor: '#1588D1', // 边框色
                barBorderWidth: 3, // 边框宽度
              },
            },
            z: 0,
          },
          {
            type: 'scatter',
            name: '条形',
            symbol: 'roundRect',
            symbolSize: [7, 20],
            symbolOffset: [3, -5],
            symbolKeepAspect: true,
            itemStyle: {
              normal: {
                color: '#1588D1',
              },
            },
            data: [total, total, total, total],
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
