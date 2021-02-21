<template>
  <div ref="chart"  :style="chartStyle">
  </div>
</template>

<script>
import echarts from 'echarts';

export default {
  name: 'barcircle',
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
      const xData = ['2020-01', '2020-02', '2020-03', '2020-04', '2020-05', '2020-06'];
      const line = ['1030', '205', '84', '568', '689', '4587'];
      const attr = {
        name: '月平均单价',
        unit: '元/单',
      };
      // var graphicData = ["A级:1000-10000元/人",
      // "B级:10000-100000元/人",
      // "C级:100000-10000000元/人",
      // ];
      return {

        tooltip: {
          trigger: 'item',
          padding: 1,
          formatter(param) {
            const resultTooltip = `${"<div style='background:rgba(13,5,30,.6);border:1px solid rgba(255,255,255,.2);padding:5px;border-radius:3px;'>"
                + "<div style='text-align:center;'>"}${param.name}</div>`
                + '<div style=\'padding-top:5px;\'>'
                + `<span style=''> ${attr.name}: </span>`
                + `<span style=''>${param.value}</span><span>${attr.unit}</span>`
                + '</div>'
                + '</div>';
            return resultTooltip;
          },
        },
        grid: {
          left: '8%',
          top: '10%',
          right: '5%',
          bottom: '12%',
        },
        legend: {
          show: true,
          icon: 'circle',
          orient: 'horizontal',
          top: '90.5%',
          right: 'center',
          itemWidth: 16.5,
          itemHeight: 6,
          // itemGap: 30,
          textStyle: {
            // color: '#FFFFFF'
            color: '#C9C8CD',
            fontSize: 14,
          },
        },
        xAxis: [{
          data: xData,
          axisLabel: {
            textStyle: {
              color: '#aaaaaa',
              fontSize: 14,
            },
            margin: 30, // 刻度标签与轴线之间的距离。
          },

          axisLine: {
            show: false, // 不显示x轴
          },
          axisTick: {
            show: false, // 不显示刻度
          },
          boundaryGap: true,
          splitLine: {
            show: false,
            width: 0.08,
            lineStyle: {
              type: 'solid',
              color: '#03202E',
            },
          },
        }],
        yAxis: [{
          splitLine: {
            show: false,
            lineStyle: {
              color: '#eee',
              type: 'solid',
            },
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisLabel: {
            textStyle: {
              color: '#888',
            },
          },
        }],
        series: [
          { // 柱底圆片
            name: '',
            type: 'pictorialBar',
            symbolSize: [60, 22], // 调整截面形状
            symbolOffset: [0, 10],
            z: 12,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(89,211,255,1)',
                },
                {
                  offset: 1,
                  color: 'rgba(23,237,194,1)',
                },
                ]),
              },
            },
            data: line,
          },

          // 柱体
          {
            name: '',
            type: 'bar',
            barWidth: 60,
            barGap: '0%',
            itemStyle: {
              normal: {
                color: {
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  type: 'linear',
                  global: false,
                  colorStops: [{ // 第一节下面
                    offset: 0,
                    color: 'rgba(0,255,245,0.5)',
                  }, {
                    offset: 1,
                    color: '#43bafe',
                  }],
                },
              },
            },

            data: line,
          },

          // 柱顶圆片
          {
            name: '',
            type: 'pictorialBar',
            symbolSize: [60, 22], // 调整截面形状
            symbolOffset: [0, -10],
            z: 12,
            symbolPosition: 'end',
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1,
                  [{
                    offset: 0,
                    color: 'rgba(89,211,255,1)',
                  },
                  {
                    offset: 1,
                    color: 'rgba(23,237,194,1)',
                  },
                  ],
                  false),
              },
            },
            data: line,
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
