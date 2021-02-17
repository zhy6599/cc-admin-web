<template>
  <div ref="chart" :style="chartStyle"></div>
</template>

<script>
import echarts from 'echarts';

export default {
  name: 'customheatmaplarge',
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
      this.chart.clear();
      this.chart.setOption(this.makeOptions());
      setTimeout(() => {
        this.chart.resize();
      }, 100);
    },
    makeOptions() {
      function getVirtulData(year) {
        year = year || '2017';
        const date = +echarts.number.parseDate(`${year}-01-01`);
        const end = +echarts.number.parseDate(`${+year + 1}-01-01`);
        const dayTime = 3600 * 24 * 1000;
        const data = [];
        for (let time = date; time < end; time += dayTime) {
          data.push([
            echarts.format.formatTime('yyyy-MM-dd', time),
            Math.floor(Math.random() * 1000),
          ]);
        }
        return data;
      }

      return {
        tooltip: {
          position: 'top',
          formatter(p) {
            const format = echarts.format.formatTime('yyyy-MM-dd', p.data[0]);
            return `${format}: ${p.data[1]}`;
          },
        },
        visualMap: {
          min: 0,
          max: 1000,
          calculable: true,
          orient: 'vertical',
          left: '670',
          top: 'center',
        },

        calendar: [{
          orient: 'vertical',
          range: '2015',
        },
        {
          left: 300,
          orient: 'vertical',
          range: '2016',
        },
        {
          left: 520,
          cellSize: [20, 'auto'],
          bottom: 10,
          orient: 'vertical',
          range: '2017',
          dayLabel: {
            margin: 5,
          },
        }],

        series: [{
          type: 'heatmap',
          coordinateSystem: 'calendar',
          calendarIndex: 0,
          data: getVirtulData(2015),
        }, {
          type: 'heatmap',
          coordinateSystem: 'calendar',
          calendarIndex: 1,
          data: getVirtulData(2016),
        }, {
          type: 'heatmap',
          coordinateSystem: 'calendar',
          calendarIndex: 2,
          data: getVirtulData(2017),
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
