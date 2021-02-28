<template>
  <div ref="chart"  :style="chartStyle">
  </div>
</template>

<script>
import echarts from 'echarts';

export default {
  name: 'barbattery2',
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
      return {
        // backgroundColor: '#000',
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
          formatter(item) {
            return `${item[0].axisValueLabel}<br />${item[0].seriesName}: ${item[0].data}`;
          },
        },
        grid: {
          top: 40,
          right: 20,
          left: 50,
          bottom: 30,
        },
        xAxis: [{
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisLine: {
            lineStyle: {
              color: '#FFFFFF',
            },
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            color: '#FFFFFF',
            fontSize: 12,
            interval: 0,
          },
        },
        {
          type: 'category',
          show: true,
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            interval: 0,
            margin: 10,
            color: '#fff',
            fontSize: '10',
          },
          data: [120, 200, 150, 80, 70, 110, 130],
        },
        ],
        yAxis: [{
          max: 200,
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#FFFFFF',
            },
          },
          axisLabel: {
            textStyle: {
              color: '#FFFFFF',
            },
            // formatter: function(value){
            //   return parseInt(value * 100) + '%'
            // },
          },
        }],
        series: [{
          name: '数量',
          type: 'pictorialBar',
          symbol: 'rect',
          itemStyle: {
            color: '#10bffc',
          },
          symbolRepeat: true,
          symbolSize: [14, 4],
          // symbolBoundingData: 100,
          symbolMargin: 0.5,
          symbolPosition: 'start',
          z: -20,
          data: [120, 200, 150, 80, 70, 110, 130],
          label: {
            normal: {
              show: false,
              position: 'top',
              verticalAlign: 'top',
              // formatter: function(value){
              //   return value && (value.data * 100).toFixed(1) + '%'
              // }
            },
          },
        }, {
          name: '',
          type: 'bar',
          barWidth: 19,
          itemStyle: {
            color: 'rgba(0,0,0,0)',
            borderWidth: 2,
            borderColor: '#10bffc',
            padding: 0,
          },
          label: {
            show: false,
          },
          z: -10,
          data: [200, 200, 200, 200, 200, 200, 200],
        }, {
          name: '',
          type: 'line',
          // barWidth: 19,
          symbol: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAFCAYAAAB1j90SAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+IEmuOgAAADFJREFUGJVjFNj/hwEK/jMQBxgZGBgYWNAFiAUwjcTaBrcEppEk22A2kmobAwMDAwMA74EE3gW8aacAAAAASUVORK5CYII=',
          symbolSize: [14, 6],
          symbolOffset: [0, '-70%'],
          itemStyle: {
            color: 'rgba(0,0,0,0)',
            borderWidth: 2,
            borderColor: '#10bffc',
            padding: 0,
          },
          hoverAnimation: false,
          legendHoverLink: false,
          z: -10,
          data: [200, 200, 200, 200, 200, 200, 200],
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

<style scoped lang="stylus">

</style>
