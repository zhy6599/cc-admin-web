<template>
  <div ref="chart"  :style="chartStyle">
  </div>
</template>

<script>
import echarts from 'echarts';

export default {
  name: 'customcar',
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
        backgroundColor: '#32374d',
        title: [{
          text: 'infographic chart✍',
          x: '50%',
          y: 30,
          textAlign: 'center',
          textStyle: {
            fontSize: '30',
            fontWeight: '100',
            color: '#FFF',
            textAlign: 'center',
          },
        }],
        legend: {
          top: '16%',
          textStyle: {
            color: '#a4a8b4',
          },
        },
        grid: {
          left: '3%',
          top: '25%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: {
          type: 'value',
          splitLine: {
            lineStyle: {
              color: 'rgba(255,255,255,0.3)',
            },
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisLabel: {
            // margin: 10,
            color: '#a4a8b4',
          },
        },
        yAxis: {
          type: 'category',
          data: ['E', 'D', 'C', 'B', 'A'],
          axisLine: {
            lineStyle: {
              color: 'rgba(255,255,255,0.3)',
            },
          },
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            // margin: 10,
            color: '#a4a8b4',
          },
        },
        color: [
          new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
            offset: 0,
            color: 'rgba(235,112,236,.8)',
          },
          {
            offset: 0.8,
            color: 'rgba(77,75,221,.8)',
          },
          {
            offset: 1,
            color: 'rgba(77,75,221,0)',
          },
          ]),
          new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
            offset: 0,
            color: 'rgba(255,157,96,.8)',
          },
          {
            offset: 0.8,
            color: 'rgba(246,84,157,.8)',
          },
          {
            offset: 1,
            color: 'rgba(246,84,157,0)',
          },
          ]),
          new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
            offset: 0,
            color: 'rgba(132,225,145,.8)',
          },
          {
            offset: 0.8,
            color: 'rgba(106,185,242,.8)',
          },
          {
            offset: 1,
            color: 'rgba(106,185,242,0)',
          },
          ]),
        ],
        series: [{
          name: '',
          type: 'bar',
          xAxisIndex: 0, // 使用的 x 轴的 index，在单个图表实例中存在多个 x 轴的时候有用。
          yAxisIndex: 0, // 使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用。
          data: [100, 100, 100, 100, 100],
          barWidth: 5,
          itemStyle: {
            normal: {
              color: 'rgba(255, 255, 255, .1)',
            },
          },
          z: 1,
        },
        {
          name: 'A',
          type: 'bar',
          stack: 'Tik Tok',
          barWidth: 25,
          itemStyle: {
            shadowColor: '#000',
            shadowBlur: 10,
            shadowOffsetY: 0,
            shadowOffsetX: 0,
            borderColor: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
              offset: 0,
              color: 'rgba(240,82,255,1)',
            },
            {
              offset: 0.8,
              color: 'rgba(77,75,221,1)',
            },
            {
              offset: 1,
              color: 'rgba(77,75,221,0)',
            },
            ],
            false),
            borderWidth: 1,
          },
          label: {
            normal: {
              show: true,
              position: 'insideRight',
              offset: [-20, 0],
              formatter: '{c}%',
              textStyle: {
                align: 'center',
                baseline: 'middle',
                fontSize: 14,
                fontWeight: '400',
                color: '#fff',
                textShadowColor: '#000',
                textShadowBlur: '0',
                textShadowOffsetX: 1,
                textShadowOffsetY: 1,
              },
            },
          },
          data: [29, 19, 26, 44, 20],
        },
        {
          name: 'B',
          type: 'bar',
          stack: 'Tik Tok',
          barWidth: 25,
          itemStyle: {
            shadowColor: '#000',
            shadowBlur: 10,
            shadowOffsetY: 0,
            shadowOffsetX: 0,
            borderColor: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
              offset: 0,
              color: 'rgba(255,151,60,.8)',
            },
            {
              offset: 0.8,
              color: 'rgba(246,84,157,.8)',
            },
            {
              offset: 1,
              color: 'rgba(246,84,157,0)',
            },
            ],
            false),
            borderWidth: 1,
          },
          label: {
            normal: {
              show: true,
              position: 'insideRight',
              offset: [-20, 0],
              formatter: '{c}%',
              textStyle: {
                align: 'center',
                baseline: 'middle',
                fontSize: 14,
                fontWeight: '400',
                color: '#fff',
                textShadowColor: '#000',
                textShadowBlur: '0',
                textShadowOffsetX: 1,
                textShadowOffsetY: 1,
              },
            },
          },
          data: [38, 36, 44, 33, 20],
        },
        {
          name: 'C',
          type: 'bar',
          stack: 'Tik Tok',
          barWidth: 25,
          itemStyle: {
            shadowColor: '#000',
            shadowBlur: 10,
            shadowOffsetY: 0,
            shadowOffsetX: 0,
            borderColor: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
              offset: 0,
              color: 'rgba(102,255,124,.8)',
            },
            {
              offset: 0.8,
              color: 'rgba(106,185,242,.8)',
            },
            {
              offset: 1,
              color: 'rgba(106,185,242,0)',
            },
            ],
            false),
            borderWidth: 1,
          },
          label: {
            normal: {
              show: true,
              position: 'insideRight',
              offset: [-20, 0],
              formatter: '{c}%',
              textStyle: {
                align: 'center',
                baseline: 'middle',
                fontSize: 14,
                fontWeight: '400',
                color: '#fff',
                textShadowColor: '#000',
                textShadowBlur: '0',
                textShadowOffsetX: 1,
                textShadowOffsetY: 1,
              },
            },
          },
          data: [33, 45, 30, 23, 60],
        },
        {
          name: '',
          type: 'bar',
          data: [100, 100, 100, 100, 100],
          barWidth: 10,
          itemStyle: {
            normal: {
              color: 'rgba(255, 255, 255, .1)',
            },
          },
          z: 1,
        },
        ],
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

<style scoped lang="stylus">

</style>
