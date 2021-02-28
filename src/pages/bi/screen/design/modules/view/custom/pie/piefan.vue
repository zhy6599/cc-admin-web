<template>
  <div ref="chart"  :style="chartStyle">
  </div>
</template>

<script>
import echarts from 'echarts';

export default {
  name: 'piefan',
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
        // backgroundColor: '#19181d',
        color: [
          '#FAE927', '#E9E416', '#C9DA36', '#9ECB3C', '#6DBC49',
          '#37B44E', '#3DBA78', '#14ADCF', '#209AC9', '#1E91CA',
          '#2C6BA0', '#2B55A1', '#2D3D8E', '#44388E', '#6A368B',
          '#7D3990', '#A63F98', '#C31C88', '#D52178', '#D5225B',
          '#D02C2A', '#D44C2D', '#F57A34', '#FA8F2F', '#D99D21',
          '#CF7B25', '#CF7B25', '#CF7B25',
        ],
        legend: {
          left: 'center',
          // orient: 'vertical',
          top: 20,
          // type: "scroll",
          itemWidth: 25,
          itemHeight: 25,
          textStyle: {
            color: '#caccd4',
          },
        },
        calculable: true,
        series: [
          {
            name: '',
            type: 'pie',
            startAngle: 0,
            clockwise: false,
            radius: ['30%', '90%'],
            center: ['50%', '65%'],
            roseType: 'area',
            avoidLabelOverlap: false,
            label: {
              show: true,
              position: 'inside',
              formatter: '{c}$',

              textStyle: {
                fontWeight: '100',
                fontFamily: 'Microsoft YaHei',
                color: '#FAFAFA',
                // fontSize: 8
              },
            },

            itemStyle: {
              normal: {
                // color: new echarts.graphic.LinearGradient(0, 1, 1, 0, [{
                //     offset: 0,
                //     color: '#ef29b1'
                // }, {
                //     offset: 1,
                //     color: '#fd7225'
                // }]),
                borderWidth: 3,
                borderColor: '#19181d',
                shadowColor: '#19181d',
                shadowBlur: 30,
              },
            },
            data: [{
              value: 600,
              name: 'A',
            },
            {
              value: 1100,
              name: 'B',
            },
            {
              value: 1200,
              name: 'C',
            },
            {
              value: 1300,
              name: 'D',
            },
            {
              value: 1250,
              name: 'E',
            },
            {
              value: 400,
              name: 'F',
            },
            {
              value: 680,
              name: 'G',
            },
            {
              value: 850,
              name: 'H',
            },
            {
              value: 470,
              name: 'I',
            },
            {
              value: 780,
              name: 'J',
            },
            {
              value: 680,
              name: 'K',
            },
            {
              value: 880,
              name: 'L',
            },
            {
              value: 1201,
              name: 'M',
            },
            {
              value: 540,
              name: 'N',
            },
            {
              value: 960,
              name: 'O',
            },
            {
              value: 1280,
              name: 'P',
            },
            ].sort((a, b) => b.value - a.value),
          },
          {
            type: 'pie',
            radius: ['28.5%', '30%'],
            data: [100],
            center: ['50%', '65%'],
            itemStyle: {
              normal: {
                color: '#888',
                shadowColor: '#000',
                shadowBlur: 15,
                shadowOffsetX: '0',
                shadowOffsetY: '0',
              },
            },
            hoverAnimation: false,
            label: {
              show: false,
            },
          },
          {
            type: 'pie',
            radius: ['26.5%', '27%'],
            data: [100],
            center: ['50%', '65%'],
            color: '#888',
            hoverAnimation: false,
            label: {
              show: false,
            },
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
