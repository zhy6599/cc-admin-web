<template>
  <div ref="chart" :style="chartStyle"></div>
</template>

<script>
import echarts from 'echarts';

export default {
  name: 'flow',
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
      title: [
        // 第零层
        {
          label: 'api',
          warn: 5,
          error: 8,
          value: 2,
        },
        // 第一层
        {
          label: 'grpc',
          warn: 5,
          error: 8,
          value: 5,
        },
        {
          label: 'cache',
          warn: 5,
          error: 8,
          value: 7,
        },
        {
          label: 'reco_rpc',
          warn: 5,
          error: 8,
          value: 7,
        },
        {
          label: 'kafka',
          warn: 5,
          error: 8,
          value: 7,
        },
        // 第二层
        {
          label: 'grpc2',
          warn: 5,
          error: 8,
          value: 2,
        },
        {
          label: 'cache2',
          warn: 5,
          error: 8,
          value: 2,
        },
        {
          label: 'leaf2',
          warn: 5,
          error: 8,
          value: 2,
        },
        {
          label: 'kafka2',
          warn: 5,
          error: 8,
          value: 2,
        },
        {
          label: 'ad2',
          warn: 5,
          error: 8,
          value: 2,
        },
        // 第三层
        {
          label: 'grpc3',
          warn: 5,
          error: 8,
          value: 2,
        },
        {
          label: 'cache3',
          warn: 5,
          error: 8,
          value: 2,
        },
        {
          label: 'kafka3',
          warn: 5,
          error: 8,
          value: 2,
        },
      ],
      colorMap: {
        normal: '#18a849',
        warn: '#FFC125',
        error: '#FF0000',
      },
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
    colorFunction(obj) {
      if (obj.value < obj.warn) {
        return this.colorMap.normal;
      } if (obj.warn <= obj.value && obj.value < obj.error) {
        return this.colorMap.warn;
      } if (obj.error <= obj.value) {
        return this.colorMap.error;
      }
      return '';
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
      // 具体的绘制流程图的方法
      const option = {
        tooltip: {
          trigger: 'item',
          formatter(para) {
            if (para.name !== 'x' || para.name !== 'y') {
              return para.name;
            }
            // 其他的都正式显示，自己是什么就显示什么。
            return '';
          },
        },
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        textStyle: {
          color: '#000',
        },
        series: [{
          type: 'graph',
          tooltip: {
            backgroundColor: 'skyblue',
            // formatter: "{b} <br/>{a} : {c} h "
          },
          layout: 'none',
          symbolSize: 10,
          roam: false,
          label: {
            normal: {
              show: true,
              position: 'inside',
              // offset: [0,-60],//居上 20
              textStyle: {
                fontSize: 12,
                color: '#fff',
                fontWeight: 'BOLD',
              },
            },
          },
          edgeSymbol: ['circle', 'arrow'],
          edgeSymbolSize: [4, 10],
          edgeLabel: {
            normal: {
              textStyle: {
                fontSize: 18,
              },
            },
          },
          // 注意，所有节点的位置都是根据自己设置的x, y坐标来设置的
          data: [
            // 零层
            {
              name: this.title[0].label,
              x: 300,
              y: 0,
              value: this.title[0],
              symbolSize: 50,
              itemStyle: {
                normal: {
                  color: this.colorFunction(this.title[0]),
                },
              },
            },
            // 一层
            {
              name: this.title[1].label,
              x: 0,
              y: 200,
              value: this.title[1],
              symbolSize: 50,
              itemStyle: {
                normal: {
                  color: this.colorFunction(this.title[1]),
                },
              },
            },
            {
              name: this.title[2].label,
              x: 150,
              y: 200,
              value: this.title[2],
              symbolSize: 50,
              itemStyle: {
                normal: {
                  color: this.colorFunction(this.title[2]),
                },
              },
            },
            {
              name: this.title[3].label,
              x: 350,
              y: 200,
              value: this.title[3],
              symbolSize: 50,
              itemStyle: {
                normal: {
                  color: this.colorFunction(this.title[3]),
                },
              },
            },
            {
              name: this.title[4].label,
              x: 600,
              y: 200,
              value: this.title[4],
              symbolSize: 50,
              itemStyle: {
                normal: {
                  color: this.colorFunction(this.title[4]),
                },
              },
            },
            // 二层
            {
              name: this.title[5].label,
              x: 0,
              y: 400,
              value: this.title[5],
              symbolSize: 50,
              itemStyle: {
                normal: {
                  color: this.colorFunction(this.title[5]),
                },
              },
            },
            {
              name: this.title[6].label,
              x: 150,
              y: 400,
              value: this.title[6],
              symbolSize: 50,
              itemStyle: {
                normal: {
                  color: this.colorFunction(this.title[6]),
                },
              },
            },
            {
              name: this.title[7].label,
              x: 300,
              y: 400,
              value: this.title[7],
              symbolSize: 50,
              itemStyle: {
                normal: {
                  color: this.colorFunction(this.title[7]),
                },
              },
            },
            {
              name: this.title[8].label,
              x: 450,
              y: 400,
              value: this.title[8],
              symbolSize: 50,
              itemStyle: {
                normal: {
                  color: this.colorFunction(this.title[8]),
                },
              },
            },
            {
              name: this.title[9].label,
              x: 600,
              y: 400,
              value: this.title[9],
              symbolSize: 50,
              itemStyle: {
                normal: {
                  color: this.colorFunction(this.title[9]),
                },
              },
            },
            // 三层
            {
              name: this.title[10].label,
              x: 0,
              y: 600,
              value: this.title[10],
              symbolSize: 50,
              itemStyle: {
                normal: {
                  color: this.colorFunction(this.title[10]),
                },
              },
            },
            {
              name: this.title[11].label,
              x: 150,
              y: 600,
              value: this.title[11],
              symbolSize: 50,
              itemStyle: {
                normal: {
                  color: this.colorFunction(this.title[11]),
                },
              },
            },
            {
              name: this.title[12].label,
              x: 450,
              y: 600,
              value: this.title[12],
              symbolSize: 50,
              itemStyle: {
                normal: {
                  color: this.colorFunction(this.title[12]),
                },
              },
            },

            // 一层
            {
              name: '1',
              x: 300,
              y: 100,
              symbolSize: 0,
            },
            {
              name: '2',
              x: 150,
              y: 100,
              symbolSize: 0,
            },
            {
              name: '3',
              x: 0,
              y: 100,
              symbolSize: 0,
            },
            {
              name: '4',
              x: 350,
              y: 100,
              symbolSize: 0,
            },
            {
              name: '5',
              x: 600,
              y: 100,
              symbolSize: 0,
            },
            // 二层
            {
              name: '21',
              x: 0,
              y: 300,
              symbolSize: 0,
            },
            {
              name: '22',
              x: 150,
              y: 300,
              symbolSize: 0,
            },
            {
              name: '23',
              x: 300,
              y: 300,
              symbolSize: 0,
            },
            {
              name: '24',
              x: 350,
              y: 300,
              symbolSize: 0,
            },
            {
              name: '25',
              x: 450,
              y: 300,
              symbolSize: 0,
            },
            {
              name: '26',
              x: 600,
              y: 300,
              symbolSize: 0,
            },
            // 三层
            {
              name: '31',
              x: 0,
              y: 500,
              symbolSize: 0,
            },
            {
              name: '32',
              x: 150,
              y: 500,
              symbolSize: 0,
            },
            {
              name: '33',
              x: 300,
              y: 500,
              symbolSize: 0,
            },
            {
              name: '34',
              x: 450,
              y: 500,
              symbolSize: 0,
            },
          ],
          // links: [],
          // 这是点与点之间的连接关系
          links: [
            // 零层
            {
              source: this.title[0].label,
              target: '1',
            },
            // 一层
            {
              source: '3',
              target: this.title[1].label,
            },
            {
              source: '2',
              target: this.title[2].label,
            },
            {
              source: '4',
              target: this.title[3].label,
            },
            {
              source: '5',
              target: this.title[4].label,
            },
            // 二层
            {
              source: this.title[3].label,
              target: '24',
            },
            {
              source: '21',
              target: this.title[5].label,
            },
            {
              source: '22',
              target: this.title[6].label,
            },
            {
              source: '23',
              target: this.title[7].label,
            },
            {
              source: '25',
              target: this.title[8].label,
            },
            {
              source: '26',
              target: this.title[9].label,
            },
            // 三层
            {
              source: this.title[7].label,
              target: '33',
            },
            {
              source: '31',
              target: this.title[10].label,
            },
            {
              source: '32',
              target: this.title[11].label,
            },
            {
              source: '34',
              target: this.title[12].label,
            },

            // 一层
            {
              source: '1',
              target: '2',
              symbol: 'none',
            },
            {
              source: '2',
              target: '3',
              symbol: 'none',
            },
            {
              source: '1',
              target: '4',
              symbol: 'none',
            },
            {
              source: '4',
              target: '5',
              symbol: 'none',
            },
            // 二层
            {
              source: '21',
              target: '22',
              symbol: 'none',
            },
            {
              source: '22',
              target: '23',
              symbol: 'none',
            },
            {
              source: '23',
              target: '24',
              symbol: 'none',
            },
            {
              source: '24',
              target: '25',
              symbol: 'none',
            },
            {
              source: '25',
              target: '26',
              symbol: 'none',
            },
            // 三层
            {
              source: '31',
              target: '32',
              symbol: 'none',
            },
            {
              source: '32',
              target: '33',
              symbol: 'none',
            },
            {
              source: '33',
              target: '34',
              symbol: 'none',
            },
          ],
          // 线条的颜色
          lineStyle: {
            normal: {
              opacity: 0.9,
              color: '#53B5EA',
              type: 'dashed',
              width: 1,
            },
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
