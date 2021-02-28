<template>
  <div ref="chart"  :style="chartStyle">
  </div>
</template>

<script>
import echarts from 'echarts';

export default {
  name: 'barshaddle',
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
    createSvg(shadowColor, shadowBlur) {
      return `
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" 
          x="0px" y="0px" 
          viewBox="0 0 32 128"
          xml:space="preserve"
      >
          <style>
              .st2 {
                  fill: transparent;
                  stroke: ${shadowColor};
                  stroke-width: ${shadowBlur}px;
                  filter: url(#chart-inset-shadow);
              }
          </style>
          <defs>
              <filter id="chart-inset-shadow" width="200%" height="200%" x="-50%" y="-50%">
            <feGaussianBlur in="SourceGraphic" result="gass" stdDeviation="${shadowBlur * 0.75}" />
            <feMerge>
              <feMergeNode in="gass" />
            </feMerge>
          </filter>
          </defs>
          <path class="st2" d="M0 0 L32 0 L32 128 L0 128 Z" />
      </svg>`;
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
      const svgString = this.createSvg('#156dff', 8);
      const svg = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });

      const DOMURL = window.URL || window.webkitURL || window;
      const insetShadowUrl = DOMURL.createObjectURL(svg);

      const dataSet = [
        ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        [120, 200, 150, 80, 70, 110, 130],
      ];

      return {
        // backgroundColor: '#101631',
        xAxis: {
          type: 'category',
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            color: 'rgba(255,255,255, 0.5)',
          },
          splitLine: {
            show: false,
          },
          data: dataSet[0],
        },
        yAxis: {
          type: 'value',
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            color: 'rgba(255,255,255, 0.5)',
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed',
              color: 'rgba(255,255,255,0.1)',
              width: 2,
            },
          },
        },
        series: [
          {
            data: dataSet[1],
            type: 'pictorialBar',
            symbol: `image://${insetShadowUrl}`,
            barWidth: 50,
          },
          {
            data: dataSet[1],
            type: 'bar',
            barWidth: 50,
            itemStyle: {
              color: 'transparent',
              borderWidth: 3,
              borderColor: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [{
                  offset: 0,
                  color: '#156dff',
                },
                {
                  offset: 1,
                  color: '#00eaeb',
                },
                ],
              ),
              shadowColor: 'blue',
              shadowBlur: 12,
              shadowOffsetX: 0,
              shadowOffsetY: 0,
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
