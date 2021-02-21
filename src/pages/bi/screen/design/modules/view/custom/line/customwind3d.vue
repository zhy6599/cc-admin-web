<template>
  <div ref="chart" :style="chartStyle"></div>
</template>

<script>
import echarts from 'echarts';
import SimplexNoise from 'components/third/bi/simplex';
import 'echarts-gl';

export default {
  name: 'customwind3d',
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
      let valMin = Infinity;
      let valMax = -Infinity;
      const noise = new SimplexNoise(Math.random);
      const noise2 = new SimplexNoise(Math.random);
      function generateData() {
        const data = [];
        for (let i = 0; i <= 50; i += 1) {
          for (let j = 0; j <= 50; j += 1) {
            const dx = noise.noise2D(i / 30, j / 30);
            const dy = noise2.noise2D(i / 30, j / 30);
            const mag = Math.sqrt(dx * dx + dy * dy);
            valMax = Math.max(valMax, mag);
            valMin = Math.min(valMin, mag);
            data.push([i, j, dx, dy, mag]);
          }
        }
        return data;
      }
      const data = generateData();
      return {
        visualMap: {
          show: false,
          min: valMin,
          max: valMax,
          dimension: 4,
          inRange: {
            color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026'],
          },
        },
        xAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#fff',
            },
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: 'rgba(255,255,255,0.2)',
            },
          },
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#fff',
            },
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: 'rgba(255,255,255,0.2)',
            },
          },
        },
        series: [{
          type: 'flowGL',
          data,
          particleDensity: 64,
          particleSize: 5,
          itemStyle: {
            opacity: 0.5,
          },
        }, {
          type: 'custom',
          data,
          encode: {
            x: 0,
            y: 0,
          },
          renderItem(params, api) {
            const x = api.value(0); const y = api.value(1); const dx = api.value(2); const
              dy = api.value(3);
            const start = api.coord([x - dx / 2, y - dy / 2]);
            const end = api.coord([x + dx / 2, y + dy / 2]);
            return {
              type: 'line',
              shape: {
                x1: start[0],
                y1: start[1],
                x2: end[0],
                y2: end[1],
              },
              style: {
                lineWidth: 2,
                stroke: '#fff',
                opacity: 0.2,
              },
            };
          },
        }],
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
