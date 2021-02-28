<template>
  <div ref="chart" :style="chartStyle"></div>
</template>

<script>
import echarts from 'echarts';

export default {
  name: 'pieflower',
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
      const scaleData = [{
        name: '工程建设',
        value: 10,
      },
      {
        name: '产权交易',
        value: 10,
      },
      {
        name: '土地交易',
        value: 10,
      },
      {
        name: '其他交易',
        value: 10,
      },
      {
        name: '土地交易',
        value: 10,
      },
      {
        name: '其他交易',
        value: 10,
      },

      ];
      const rich = {
        white: {
          color: '#fff',
          align: 'center',
          fontWeight: 'bold',
          padding: [3, 0],
        },
      };
      const placeHolderStyle = {
        normal: {
          label: {
            show: false,
          },
          labelLine: {
            show: false,
          },
          color: 'rgba(0, 0, 0, 0)',
          borderColor: 'rgba(0, 0, 0, 0)',
          borderWidth: 0,
        },
      };
      const data = [];
      const color1 = ['rgb(255, 153, 153)', 'rgb(255, 176, 63)', 'rgb(61, 186, 45)', 'rgb(43, 166, 254)', 'rgb(255,222,0)', 'rgb(255,0,0)'];

      for (let i = 0; i < scaleData.length; i += 1) {
        data.push({
          value: scaleData[i].value,
          name: scaleData[i].name,
          itemStyle: {
            normal: {
              borderWidth: 4,
              shadowBlur: 30,
              borderColor: color1[i],
              shadowColor: color1[i],
              color: color1[i],
              opacity: 0.75,
            },
          },
        }, {
          value: 2,
          name: '',
          itemStyle: placeHolderStyle,
        });
      }
      const seriesObj = [{
        name: '',
        type: 'pie',
        clockWise: false,
        radius: [100, 200],
        hoverAnimation: false,
        itemStyle: {
          normal: {
            label: {
              show: true,
              position: 'inner',
              fontWeight: 'bold',
              formatter(params) {
                let percent = 0;
                let total = 0;
                for (let i = 0; i < scaleData.length; i += 1) {
                  total += scaleData[i].value;
                }
                percent = ((params.value / total) * 100).toFixed(0);
                if (params.name !== '') {
                  return `${params.name}\n{white|占比${percent}%}`;
                }
                return '';
              },
              rich,
            },
            labelLine: {
              show: false,
            },
          },
        },
        data,
      }];
      return {
        // backgroundColor: '#04243E',
        tooltip: {
          show: false,
        },
        legend: {
          show: false,
        },
        toolbox: {
          show: false,
        },
        series: seriesObj,
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
