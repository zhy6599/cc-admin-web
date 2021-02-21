<template>
  <div ref="chart" :style="chartStyle"></div>
</template>

<script>
import echarts from 'echarts';
import SimplexNoise from 'components/third/bi/simplex';
import 'echarts-gl';

export default {
  name: 'bar3dcolor',
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
      function generateData() {
        const data = [];
        const noise = new SimplexNoise(Math.random);
        for (let i = 0; i <= 10; i += 1) {
          for (let j = 0; j <= 10; j += 1) {
            const value = noise.noise2D(i / 5, j / 5);
            data.push([i, j, value * 2 + 4]);
          }
        }
        return data;
      }

      const series = [];
      for (let i = 0; i < 10; i += 1) {
        series.push({
          type: 'bar3D',
          data: generateData(),
          stack: 'stack',
          shading: 'lambert',
          emphasis: {
            label: {
              show: false,
            },
          },
        });
      }

      return {
        xAxis3D: {
          type: 'value',
        },
        yAxis3D: {
          type: 'value',
        },
        zAxis3D: {
          type: 'value',
        },
        grid3D: {
          viewControl: {
            autoRotate: true,
          },
          light: {
            main: {
              shadow: true,
              quality: 'ultra',
              intensity: 1.5,
            },
          },
        },
        series,
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
